import React, { useState } from 'react';
import './ImageStack.css';
import { Button, Modal, Box, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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

      <Modal open={open} >
          <Carousel>
            {screenshots.map((url, i) => (
              <div key={i} className='center' >
                <img
                  src={url}
                  alt={`Screenshot ${i + 1}`}
                  className="modal-image"
                  id={`image-${i + 1}`}
                  onClose={handleClose}
                />
                <Button className="downloadImages">Download</Button>
              </div>
            ))}
          </Carousel>
      </Modal>
    </div>
  );
};

export default ImageStack;
