// @ts-check

import React, { createContext, useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { getUser, createUser, updateUser, sendRequest } from './lib/ApiService';

const Context = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
    role: 'Helpee',
    requests: [],
    reviews: [],
    socketID: '',
    registered: false,
  });
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({ accepted: false, ended: false });
  const [stroke, setStroke] = useState([]);
  const [incomingStroke, setIncomingStroke] = useState([]);
  const [request, setRequest] = useState({
    content: '',
    type: '',
    status: 'Pending',
    sent: false,
  });
  const [currentPage, setCurrentPage] = useState('Request');

  const localVideo = useRef({});
  const remoteVideo = useRef({});
  // const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        localVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setCurrentUser({ ...currentUser, socketID: id }));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on('stroke', (stroke) => {
      setIncomingStroke(stroke);
    });

    socket.on('callEnded', () => {
      setCall({ accepted: false, ended: true });
      setCurrentPage('Request');
    });

    if (isAuthenticated && currentUser.registered === true) {
      socket.emit('userConnected', { name: currentUser.username });
      socket.on('users', (users) => {
        const usersWithPendingRequests = users.filter((user) =>
          user.requests.some((request) => request.status === 'Pending')
        );
        setOnlineUsers(usersWithPendingRequests);
      });
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    const recipientID = call.userToCall;
    socket.emit('stroke', { recipientID, stroke });
  }, [stroke]);

  // Check if user exists in database
  const handleGetUser = async () => {
    const receivedUser = await getUser({ user });
    if (receivedUser) {
      setCurrentUser({
        ...currentUser,
        username: receivedUser.username,
        email: receivedUser.email,
        role: receivedUser.role,
        requests: receivedUser.requests,
        reviews: receivedUser.reviews,
        registered: true,
      });
    }
  };

  // Create user in database
  const handleCreateUser = async (event) => {
    event.preventDefault();
    const receivedUser = await createUser({
      username: currentUser.username,
      email: user.email,
      role: currentUser.role,
    });
    if (receivedUser) {
      setCurrentUser({
        ...currentUser,
        username: receivedUser.username,
        email: receivedUser.email,
        role: receivedUser.role,
        registered: true,
      });
    }
  };

  const handleUpdateUser = async () => {
    await updateUser({
      socketID: currentUser.socketID,
      username: currentUser.username,
      role: currentUser.role,
    });
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setRequest({ ...request, sent: true });
    const newRequest = await sendRequest({
      username: currentUser.username,
      content: request.content,
      type: request.type,
      status: request.status,
    });
    socket.emit('newRequest', newRequest);
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setCall({ isReceivingCall: false, userToCall: id });
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: currentUser.socketID,
        name: currentUser.username,
      });
    });

    peer.on('stream', (currentStream) => {
      remoteVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCall({ ...call, accepted: true, isReceivingCall: false });
      peer.signal(signal);
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        localVideo.current.srcObject = currentStream;
      });
    // connectionRef.current = peer;
  };

  const answerCall = () => {
    setCall({ ...call, accepted: true });

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      remoteVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    // connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit('leaveCall', {
      recipientID: call.from,
      senderID: currentUser.socketID,
    });
    setCall({ accepted: false, ended: true });
    setRequest({ content: '', type: '', status: 'Pending', sent: false });
    setCurrentPage('Request');
    // connectionRef.current.destroy();
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        currentPage,
        isAuthenticated,
        user,
        onlineUsers,
        call,
        localVideo,
        remoteVideo,
        stream,
        incomingStroke,
        request,
        setCurrentUser,
        loginWithRedirect,
        logout,
        callUser,
        leaveCall,
        answerCall,
        handleGetUser,
        handleCreateUser,
        handleUpdateUser,
        setStroke,
        setRequest,
        handleRequest,
        setCurrentPage,
        setStream,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
