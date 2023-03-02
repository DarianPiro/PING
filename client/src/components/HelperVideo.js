import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../Context';
import { Atrament } from 'atrament';

const VideoChat = () => {
  const {
    currentUser,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    leaveCall,
    callUser,
    onlineUsers,
    setStroke,
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

  return (
    <div>
      <h1>{currentUser.username}, someone needs your help!</h1>
      <div>
        {userVideo && (
          <div className="video-container" style={{ videoWidth }}>
            <video
              className="small-video"
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: '150px' }}
            />
            <canvas ref={canvasRef} id="sketchpad" className="sketchpad" />
              <video
                className="big-video"
                playsInline
                muted
                ref={userVideo}
                autoPlay
                style={{ width: videoWidth, height: videoHeight }}
              />
            
          </div>
        )}
      </div>

      {callAccepted && !callEnded && (
        <button onClick={leaveCall}>Hang Up</button>
      )}

      <div>
        <h2>Users waiting</h2>
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
