import React, { useContext, useEffect, useRef, useState } from 'react';
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
      <h1>{currentUser.username}, don't despair!</h1>
      <h1> Help is on the way</h1>
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
            <canvas ref={canvasRef}  className="sketchpad" />
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
        <button onClick={answerCall}>Accept help</button>
      )}

      {callAccepted && !callEnded && (
        <div>
          <button onClick={handleScreenshot}>Take Screenshot</button>
          {screenshotUrl && (
            <div>
              <h2>Screenshot:</h2>
              <img src={screenshotUrl} alt="Screenshot" />
            </div>
          )}
          <button onClick={leaveCall}>Hang Up</button>
        </div>
      )}
    </div>
  );
};

export default VideoChat;
