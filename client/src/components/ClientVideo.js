import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../Context';
import ImageStack from './ui/ImageStack';
import { Atrament } from 'atrament';
import { Typography } from '@mui/material';
import { StyledButton } from './ui/StyledComponents';
import { uploadImageToCloudinary } from '../lib/ImageApi';
import mergeImages from 'merge-images';

const ClientVIdeo = () => {
  const {
    currentUser,
    answerCall,
    localVideo,
    remoteVideo,
    call,
    leaveCall,
    incomingStroke,
    setStream,
    stream,
  } = useContext(Context);
  const [screenshots, setScreenshots] = useState([]);

  const canvasRef = useRef(null);
  const sketchpadRef = useRef(null);

  let videoWidth = window.innerWidth;
  let videoHeight = window.innerHeight;

  useEffect(() => {
    localVideo.current.srcObject = stream;

    console.log(call);
  }, [call]);

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

  const handleScreenshot = async () => {
    const canvas1 = canvasRef.current;
    const video = remoteVideo.current;
    const ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(
      video,
      0,
      0,
      remoteVideo.current.videoWidth,
      remoteVideo.current.videoWidth
    );

    const dataUrl1 = canvas1.toDataURL({ format: 'png' });
    canvas1.remove();

    const canvas2 = canvasRef.current;
    const ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(
      sketchpadRef.current.canvas,
      0,
      0,
      remoteVideo.current.videoWidth,
      remoteVideo.current.videoWidth
    );
    const dataUrl2 = canvas2.toDataURL({ format: 'png' });

    canvas2.remove();

    let screenshotUrl;

    const image1 = await uploadImageToCloudinary(
      dataUrl1,
      currentUser.username
    );
    const image2 = await uploadImageToCloudinary(
      dataUrl2,
      currentUser.username
    );

    mergeImages([image1, image2], {
      width: remoteVideo.current.videoWidth,
      height: remoteVideo.current.videoWidth,
    }).then((b64) => {
      screenshotUrl = b64;
    });

    const savedScreenshot = await uploadImageToCloudinary(
      screenshotUrl,
      currentUser.username
    );

    setScreenshots((prevUrls) => [...prevUrls, savedScreenshot]);
  };

  return (
    <div className="video-container">
      {!call.incoming && (
        <Typography variant="h4">
          Despair not, <br />
          <span className="orange">help</span> is on the way!
        </Typography>
      )}

      {/* {call.incoming && !call.accepted && ( */}
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
      {/* )} */}

      <canvas ref={canvasRef} className="sketchpad" />
      <div>
        {screenshots.length > 0 && <ImageStack screenshots={screenshots} />}

        <button onClick={handleScreenshot} className="button save-step">
          Save
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
          style={{ width: '150px' }}
        />

        <video
          className="big-video"
          playsInline
          muted
          ref={localVideo}
          autoPlay
          // crossOrigin="anonymous"
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default ClientVIdeo;
