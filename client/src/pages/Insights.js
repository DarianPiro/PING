import React, { useContext, useEffect, useState } from 'react';
import { getAllUsers } from '../lib/ApiService';
import { Context } from '../Context';
import { Typography, Rating, Box } from '@mui/material';
import { Interval, DateTime, Duration } from 'luxon';

const Insights = () => {
  const { currentUser } = useContext(Context);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      const data = await getAllUsers();
      const requests = [];

      for (const user of data) {
        for (const request of user.requests) {
          if (
            request.review &&
            request.review.helper === currentUser.username
          ) {
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
      {allRequests.length === 0 && (
        <Typography variant="h6">
          No reviews yet, <br /> <span className="orange">help </span>
          someone first!
        </Typography>
      )}
      {allRequests.length > 0 && (
        <Box>
          <Typography variant="h6">Average rating</Typography>
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
          <Typography variant="h6">Average call time</Typography>
          <Typography variant="h6">
            {
              allRequests
                .reduce((acc, curr) => {
                  return (
                    acc +
                    Duration.fromISO(curr.request.review.time).milliseconds
                  );
                }, 0 / allRequests.length)
                }
          </Typography>
          <Typography variant="h6">Reviews</Typography>
          <Box sx={{ overflow: 'auto', maxHeight: '75vh', width: '80vw' }}>
            {allRequests.map((obj) => {
              return (
                <Box
                  key={obj.request._id}
                  sx={{ border: 1, p: 1, m: 3, borderRadius: 2 }}
                >
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
                    <b>Time:</b>{' '}
                    {Duration.fromISO(obj.request.review.time).toFormat(
                      'mm:ss'
                    )}
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
        </Box>
      )}
    </Box>
  );
};

export default Insights;
