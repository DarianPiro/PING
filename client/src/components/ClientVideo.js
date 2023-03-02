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
    incomingStroke,
  } = useContext(Context);

  const canvasRef = useRef(null);

  let videoWidth = 600;
  let videoHeight = 450;

  useEffect(() => {}, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const sketchpad = new Atrament(canvasRef.current, {
      color: 'orange',
    });

    if (incomingStroke.length) {
      const points = sketchpad.points;
      const firstPoint = incomingStroke.shift().point;
      sketchpad.beginStroke(firstPoint.x, firstPoint.y);
      let prevPoint = firstPoint;
      while (points.length > 0) {
        const point = points.shift().point;
        const { x, y } = sketchpad.draw(
          point.x,
          point.y,
          prevPoint.x,
          prevPoint.y
        );
        prevPoint = { x, y };
      }
      sketchpad.endStroke(prevPoint.x, prevPoint.y);
    }
  }, [incomingStroke]);

  return (
    <div>
      <h1>Hi, {currentUser.username}!</h1>
      <div>
        {userVideo && (
          <div className="video-container" style={{ videoWidth }}>
            <video
              className="small-video"
              playsInline
              muted
              ref={userVideo}
              autoPlay
              style={{ width: '150px' }}
            />
            <canvas ref={canvasRef} id="sketchpad" className="sketchpad" />
            <video
              className="big-video"
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
    </div>
  );
};

export default VideoChat;
