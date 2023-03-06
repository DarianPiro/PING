import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../Context';
import { Atrament } from 'atrament';

const VideoChat = () => {
  const {
    call,
    localVideo,
    remoteVideo,
    leaveCall,
    setStroke,
    setStream,
    stream,
  } = useContext(Context);

  const canvasRef = useRef(null);
  let videoWidth = 600;
  let videoHeight = 450;

  useEffect(() => {
    localVideo.current.srcObject = stream;
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
      <div className="video-container" style={{ videoWidth }}>
        {call.accepted && !call.ended && (
          <button className="button end-call" onClick={leaveCall}>
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
    </div>
  );
};

export default VideoChat;
