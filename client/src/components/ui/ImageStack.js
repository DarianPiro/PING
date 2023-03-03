import React from 'react';
import { Typography } from '@mui/material';

const ImageStack = ({ screenshots }) => {
  return (
    <>
      <Typography variant="h6"> Screenshots </Typography>
      <br />
      <div className="image-stack-container center">
        <br />
        {screenshots.slice(-3).map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Screenshot ${index + 1}`}
            className="image-stack"
          />
        ))}
      </div>
    </>
  );
};

export default ImageStack;
