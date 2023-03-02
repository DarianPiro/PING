// @ts-check

import React, { createContext, useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { getUser, createUser } from './lib/ApiService';

const Context = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
    role: 'Helpee',
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

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setCurrentUser({ ...currentUser, socketID: id }));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on('stroke', (stroke) => {
      setIncomingStroke(stroke);
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && currentUser.registered === true) {
      console.log('Current User: ' + currentUser.username);
      socket.emit('userConnected', { name: currentUser.username });
      socket.on('users', (users) => {
        setOnlineUsers(users.filter((u) => u.name !== currentUser.username));
      });
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    const recipientID = call.userToCall;
    socket.emit('stroke', { recipientID, stroke });
  }, [stroke]);

  // Check if user exists in database
  const handleLogin = async () => {
    const receivedUser = await getUser({ user });
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
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
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
        myVideo,
        userVideo,
        stream,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
        handleLogin,
        handleCreateUser,
        setStroke,
        incomingStroke,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
