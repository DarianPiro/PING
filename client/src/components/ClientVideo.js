import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../Context';
import ImageStack from './ui/ImageStack';
import { Atrament } from 'atrament';
import { Typography } from '@mui/material';
import { StyledButton } from './ui/StyledComponents';
import { uploadImageToCloudinary } from '../lib/ImageApi';
import mergeImages from 'merge-images';
import AR from './AR';

const ClientVIdeo = () => {
  const {
    currentUser,
    answerCall,
    localVideo,
    remoteVideo,
    call,
    leaveCall,
    incomingStroke,
    stream,
    setStream,
  } = useContext(Context);
  const [screenshots, setScreenshots] = useState([]);

  const canvasRef = useRef({});

  let videoWidth = window.innerWidth;
  let videoHeight = window.innerHeight;

  useEffect(() => {
    if (call.accepted) {
      localVideo.current.srcObject = stream;
      console.log({ localVideo });
      console.log({ remoteVideo });
    }
    console.log(call);
  }, [call]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

  //   const sketchpad = new Atrament(canvasRef.current, {
  //     color: 'orange',
  //   });
  //   sketchpad.smoothing = 1.3;
  //   sketchpadRef.current = sketchpad;

  //   if (incomingStroke.points) {
  //     const points = incomingStroke.points.slice();
  //     const firstPoint = points.shift().point;
  //     sketchpad.beginStroke(firstPoint.x, firstPoint.y);
  //     let prevPoint = firstPoint;
  //     while (points.length > 0) {
  //       const point = points.shift().point;
  //       const { x, y } = sketchpad.draw(
  //         point.x,
  //         point.y,
  //         prevPoint.x,
  //         prevPoint.y
  //       );
  //       prevPoint = { x, y };
  //     }
  //     sketchpad.endStroke(prevPoint.x, prevPoint.y);
  //   }
  }, []);

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
    <div >
      <div className="center">
        {!call.incoming && (
          <Typography variant="h4">
            Despair not, <br />
            <span className="orange">help</span> is on the way!
          </Typography>
        )}

        {call.incoming && !call.accepted && (
          <>
            <Typography variant="h4">
              <span className="orange">Help</span> is here!
            </Typography>
            <StyledButton
              onClick={answerCall}
              variant="contained"
              style={{
                margin: '0.5rem',
                zIndex: 1000,
              }}
            >
              Accept help
            </StyledButton>
          </>
        )}
      </div>
      {/* <canvas ref={canvasRef} className="sketchpad" /> */}
      {call.accepted && !call.ended && (
        <div className="video-container">
          {screenshots.length > 0 && <ImageStack screenshots={screenshots} />}

          <button onClick={handleScreenshot} className="button save-step">
            Screenshot
          </button>
          <button onClick={leaveCall} className="button end-call">
            End Call
          </button>

          <video
            className="small-video"
            playsInline
            muted
            ref={remoteVideo}
            autoPlay
          />
          <AR ref={canvasRef}c />
          <video
            className="big-video"
            playsInline
            muted
            ref={localVideo}
            autoPlay
          />
        </div>
      )}
    </div>
  );
};

export default ClientVIdeo;
