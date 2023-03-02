import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../Context';
import { Atrament } from 'atrament';

const VideoChat = () => {
  const {
    currentUser,
    callAccepted,
    answerCall,
    myVideo,
    userVideo,
    callEnded,
    call,
    leaveCall,
    callUser,
    onlineUsers,
    setStroke,
    incomingStroke,
  } = useContext(Context);

  const canvasRef = useRef(null);

  let videoWidth = 600;
  let videoHeight = 450;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const sketchpad = new Atrament(canvasRef.current, {
      color: 'orange',
    });

    sketchpad.recordStrokes = true;
    sketchpad.addEventListener('strokerecorded', ({ stroke }) =>
      setStroke(stroke)
    );

  }, []);

  useEffect(() => {
    const incomingSketchpad = new Atrament(canvasRef.current, {
      color: 'orange',
    });
    console.log(incomingStroke);
    if (incomingStroke.length) {
      const points = incomingSketchpad.points;
      const firstPoint = incomingStroke.shift().point;
      incomingSketchpad.beginStroke(firstPoint.x, firstPoint.y);
      let prevPoint = firstPoint;
      while (points.length > 0) {
        const point = points.shift().point;
        const { x, y } = incomingSketchpad.draw(
          point.x,
          point.y,
          prevPoint.x,
          prevPoint.y
        );
        prevPoint = { x, y };
      }
      incomingSketchpad.endStroke(prevPoint.x, prevPoint.y);
    }
  }, [incomingStroke]);

  return (
    <div>
      <h1>Hi, {currentUser.username}!</h1>
      <div>
        {userVideo && (
          <div className="video-container" style={{ videoWidth }}>
            <video
              className="remote-video"
              playsInline
              muted
              ref={userVideo}
              autoPlay
              style={{ width: '150px' }}
            />
            <canvas ref={canvasRef} id="sketchpad" className='sketchpad' />
            <canvas ref={canvasRef} id="incomingSketchpad" className='sketchpad' />
            <video
              className="local-video"
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: videoWidth }}
            ></video>
          </div>
        )}
      </div>
      {call.isReceivingCall && !callAccepted && (
        <button onClick={answerCall}>Accept</button>
      )}

      {callAccepted && !callEnded && (
        <button onClick={leaveCall}>Hang Up</button>
      )}

      <div>
        <h2>Online Users:</h2>
        {onlineUsers.map((u) => (
          <button key={u.socketID} onClick={() => callUser(u.socketID)}>
            {u.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoChat;
