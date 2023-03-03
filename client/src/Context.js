// @ts-check

import React, { createContext, useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import {
  getUser,
  createUser,
  // updateUser,
  // deleteUser,
  sendRequest,
} from './lib/ApiService';

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
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
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
  const connectionRef = useRef();

  useEffect(() => {
    if (currentUser.registered) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          localVideo.current.srcObject = currentStream;
        });
    }
    socket.on('me', (id) => setCurrentUser({ ...currentUser, socketID: id }));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on('stroke', (stroke) => {
      setIncomingStroke(stroke);
    });

    if (isAuthenticated && currentUser.registered === true) {
      console.log('Current User: ' + currentUser.username);
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
  const handleCreateUser = async () => {
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
    console.log('Call User: ' + id);
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
      setCallAccepted(true);
      peer.signal(signal);
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        localVideo.current.srcObject = currentStream;
      });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        localVideo.current.srcObject = currentStream;
      });

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      remoteVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        user,
        loginWithRedirect,
        logout,
        onlineUsers,
        call,
        callAccepted,
        localVideo,
        remoteVideo,
        stream,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
        handleGetUser,
        handleCreateUser,
        setStroke,
        incomingStroke,
        request,
        setRequest,
        handleRequest,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
