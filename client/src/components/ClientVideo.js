import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../Context';
import { Atrament } from 'atrament';
import Button from '@mui/material/Button';

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
  const [screenshotUrl, setScreenshotUrl] = useState(null);

  const canvasRef = useRef(null);
  const sketchpadRef = useRef(null);

  let videoWidth = 600;
  let videoHeight = 450;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const sketchpad = new Atrament(canvasRef.current, {
      color: 'orange',
    });
    sketchpad.smoothing = 1.3;
    sketchpadRef.current = sketchpad;

    if (incomingStroke.points) {
      const points = incomingStroke.points.slice();
      const firstPoint = points.shift().point;
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

  const handleScreenshot = () => {
    const canvas = canvasRef.current;
    const video = userVideo.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    const dataUrl = canvas.toDataURL();
    canvas.remove();
    setScreenshotUrl(dataUrl);
  };

  return (
    <div>
      <h1>
        Don't despair, <span className="orange">help</span> is on the way!
      </h1>
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
            <canvas ref={canvasRef} className="sketchpad" />
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
        <Button
          onClick={answerCall}
          variant="contained"
          style={{
            color: '#8793a2',
            fontWeight: 'bold',
            backgroundColor: '#2d3b4c',
            margin: '10px',
          }}
        >
          Accept help
        </Button>
      )}

      {callAccepted && !callEnded && (
        <div>
          <Button
            onClick={handleScreenshot}
            variant="contained"
            style={{
              color: '#8793a2',
              fontWeight: 'bold',
              backgroundColor: '#2d3b4c',
            }}
          >
            Take Screenshot
          </Button>
          {screenshotUrl && (
            <div>
              <h2>Screenshot:</h2>
              <img src={screenshotUrl} alt="Screenshot" />
            </div>
          )}
          <Button
            onClick={leaveCall}
            variant="contained"
            style={{
              color: '#8793a2',
              fontWeight: 'bold',
              backgroundColor: '#2d3b4c',
              margin: '10px',
            }}
          >
            Hang Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoChat;
