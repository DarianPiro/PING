import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../Context';
import { Atrament } from 'atrament';
import Button from '@mui/material/Button';

const VideoChat = () => {
  const {
    currentUser,
    callAccepted,
    call,
    localVideo,
    remoteVideo,
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
    sketchpad.smoothing = 1.3;
    sketchpad.addEventListener('strokerecorded', ({ stroke }) =>
      setStroke(stroke)
    );
  }, [call]);

  return (
    <div>
      <h1>
        {currentUser.username}, someone needs your{' '}
        <span className="orange"> help</span>!
      </h1>
      <div>
        {call.isReceivingCall === false && (
          <div className="video-container" style={{ videoWidth }}>
            {callAccepted && !callEnded && (
              <button
                className="button end-call"
                onClick={leaveCall}
              >
                End Call
              </button>
            )}
            <video
              className="small-video"
              playsInline
              muted
              ref={localVideo}
              autoPlay
              style={{ width: '150px' }}
            />

            <canvas ref={canvasRef} id="sketchpad" className="sketchpad" />
            <video
              className="big-video"
              playsInline
              muted
              ref={remoteVideo}
              autoPlay
              style={{ width: videoWidth, height: videoHeight }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat;
