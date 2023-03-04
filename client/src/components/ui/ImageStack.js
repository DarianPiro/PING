import React, { useState } from 'react';
import './ImageStack.css';
import { Button, Modal, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  height: '50vh',
};

const ImageStack = ({ screenshots }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="image-stack-container" onClick={handleOpen}>
      <br />
      {screenshots.slice(-3).map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Screenshot ${index + 1}`}
          className="image-stack-image"
          id={`image-${index + 1}`}
        />
      ))}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Carousel>
            {screenshots.map((url, i) => (
              <Image key={i} url={url} />
            ))}
          </Carousel>
        </Box>
      </Modal>
    </div>
  );
};

function Image(props) {
  return (
    <>
      <DownloadForOfflineIcon
        // onClick={handleClick}
        cursor="pointer"
        style={{
          fontSize: '2rem',
          margin: '10px',
          opacity: '0.5',
          color: 'black',
        }}
      />
      <img
        key={props.i}
        src={props.url}
        alt={`Screenshot ${props.index + 1}`}
        className="modal-image"
        id={`image-${props.index + 1}`}
      />
    </>
  );
}

export default ImageStack;
