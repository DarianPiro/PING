import React, { useContext, useEffect, useState } from 'react';
import { getAllUsers } from '../lib/ApiService';
import { Context } from '../Context';
import { Typography, Rating, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Insights = () => {
  const { currentUser } = useContext(Context);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      const data = await getAllUsers();
      const requests = [];

      for (const user of data) {
        for (const request of user.requests) {
          if (request.review.helper === currentUser.username) {
            requests.push({ helpee: user.username, request: request });
          }
        }
      }

      setAllRequests(requests);
    };
    getRequests();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Insights</Typography>
      <Typography variant="h6">Your average rating is</Typography>
      <Rating
        name="read-only"
        value={
          allRequests.reduce((acc, curr) => {
            return acc + curr.request.review.rating;
          }, 0) / allRequests.length
        }
        readOnly
        precision={0.5}
      />
      {allRequests.map((obj) => {
        return (
          <Box key={obj.request._id} sx={{ border: 1, p: 1, m: 3, borderRadius: 2, width: '30vw' }}>
            <p>
              <b>Helpee:</b> {obj.helpee}
            </p>
            <p>
              <b>Request:</b> {obj.request.content}
            </p>
            <p>
              <b>Review:</b> {obj.request.review.review}
            </p>
            <p>
            <Rating
              name="read-only"
              value={obj.request.review.rating}
              readOnly
              precision={0.5}
            />
            </p>
          </Box>
        );
      })}
    </Box>
  );
};

export default Insights;
