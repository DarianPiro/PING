import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../Context';
import ImageStack from './ui/ImageStack';
import { Atrament } from 'atrament';
import { Button, Typography } from '@mui/material';
import { uploadImageToCloudinary } from '../lib/ImageUpload';

const VideoChat = () => {
  const {
    currentUser,
    answerCall,
    localVideo,
    remoteVideo,
    call,
    leaveCall,
    incomingStroke,
    setStream,
  } = useContext(Context);
  const [screenshots, setScreenshots] = useState([]);

  const canvasRef = useRef(null);
  const sketchpadRef = useRef(null);

  let videoWidth = 600;
  let videoHeight = 450;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        localVideo.current.srcObject = currentStream;
      });

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

  const handleScreenshot = async () => {
    const canvas = canvasRef.current;
    const video = remoteVideo.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    const dataUrl = canvas.toDataURL({ format: 'png' });
    canvas.remove();

    const screenshotUrl = await uploadImageToCloudinary(
      dataUrl,
      currentUser.username
    );
    setScreenshots((prevUrls) => [...prevUrls, screenshotUrl]);
  };

  return (
    <div>
      {!call.isReceivingCall && (
        <Typography variant="h4">
          Don't despair, <br />
          <span className="orange">help</span> is on the way!
        </Typography>
      )}

      {call.isReceivingCall && !call.accepted && (
        <>
          <Typography variant="h4">
            <span className="orange">Help</span> is here!
          </Typography>
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
        </>
      )}
      <div className="video-container" style={{ videoWidth }}>
        {remoteVideo && (
          <>
            {screenshots.length > 0 && <ImageStack screenshots={screenshots} />}
            {call && (
              <>
                <button onClick={handleScreenshot} className="button save-step">
                  Save
                </button>
                <button onClick={leaveCall} className="button end-call">
                  End Call
                </button>
              </>
            )}
            <video
              className="small-video"
              playsInline
              muted
              ref={remoteVideo}
              autoPlay
              style={{ width: '150px' }}
            />
            <canvas ref={canvasRef} className="sketchpad" />
            <video
              className="big-video"
              playsInline
              muted
              ref={localVideo}
              autoPlay
              style={{ width: videoWidth }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VideoChat;
