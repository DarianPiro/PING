import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { sendReview } from '../lib/ApiService';
import { Typography, Rating, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {
  StyledTextField,
  StyledButton,
} from '../components/ui/StyledComponents';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const RateHelper = () => {
  const { request, setRequest } = useContext(Context);
  const [hover, setHover] = useState(-1);

  const handleSendReview = async (e) => {
    e.preventDefault();
    const response = await sendReview({
      request,
    });
    console.log(request)
    if (response) {
      setRequest({
        _id: '',
        content: '',
        type: 'Plumbing',
        status: 'Completed',
        sent: false,
        helper: '',
        rating: 0,
        review: '',
      });
    }
  };

  return (
    <div>
      <Typography variant="h4">
        Rate your <span className="orange"> helper</span> {request.helper}!
      </Typography>
      <form onSubmit={handleSendReview}>
        <br />
        <StyledTextField
          required
          label="Comment"
          inputProps={{ maxLength: 140 }}
          maxRows={4}
          minRows={2}
          multiline
          variant="outlined"
          value={request.review}
          onChange={(e) => setRequest({ ...request, review: e.target.value })}
        />
        <br />
        <br />
        <Rating
          name="hover-feedback"
          value={request.rating}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(e) => setRequest({ ...request, rating: e.target.value })}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <div style={{ height: '3rem' }}>
          {request.rating !== null && (
            <Box sx={{ ml: 2 }}>
              {labels[hover !== -1 ? hover : request.rating]}
            </Box>
          )}
        </div>
        <StyledButton
          variant="contained"
          color="primary"
          type="submit"
          style={{
            color: '#8793a2',
            fontWeight: 'bold',
            backgroundColor: '#2d3b4c',
            margin: '10px',
          }}
        >
          Send
        </StyledButton>
      </form>
    </div>
  );
};

export default RateHelper;
