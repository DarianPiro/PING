import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../Context';
import ImageStack from './ui/ImageStack';
import { Typography } from '@mui/material';
import { StyledButton } from './ui/StyledComponents';
import { uploadImageToCloudinary } from '../lib/ImageApi';
import AR from './AR';

const VideoChat = () => {
  const {
    currentUser,
    answerCall,
    remoteVideo,
    localVideo,
    call,
    leaveCall,
    setStream,
    stream,
  } = useContext(Context);
  const [screenshots, setScreenshots] = useState([]);

  const canvasRef = useRef(null);

  let videoWidth = window.innerWidth;
  let videoHeight = window.innerHeight;

  useEffect(() => {
    if (call.accepted) {
      localVideo.current.srcObject = stream;
      console.log({ localVideo });
      console.log({ remoteVideo });
    }
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
    <div className="video-container">
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

      {/* {screenshots.length > 0 && <ImageStack screenshots={screenshots} />} */}
      {call.accepted && (
        <>
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
          />{' '}
          {/* <AR /> */}
          <video
            className="big-video"
            playsInline
            muted
            ref={localVideo}
            autoPlay
          />
        </>
      )}
    </div>
  );
};

export default VideoChat;
