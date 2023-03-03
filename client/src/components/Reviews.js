import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import { Typography } from '@mui/material';

const Reviews = () => {
  const { currentUser, handleGetUser } = useContext(Context);

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div>
      <Typography variant="h4">Reviews</Typography>
      {currentUser.reviews.map((review) => {
        return (
          <div key={review.id}>
            <p>{review.description}</p>
            <p>{review.rating}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
