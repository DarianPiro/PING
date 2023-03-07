import React, { useContext } from 'react';
import { Context } from '../Context';
import { Typography, MenuItem } from '@mui/material';
import {
  StyledTextField,
  StyledSelect,
  StyledButton,
} from './ui/StyledComponents';

const CreateRequest = () => {
  const { request, setRequest, handleRequest } = useContext(Context);
  return (
    <div className='center'>
      <Typography variant="h4" >
        State your <span className="orange"> problem</span>!
      </Typography>
      <form onSubmit={handleRequest}>
        <br />
        <StyledTextField
          required
          label="Request"
          inputProps={{ maxLength: 57, style: { color: 'white' } }}
          maxRows={3}
          minRows={2}
          multiline
          variant="outlined"
          value={request.content}
          onChange={(e) => setRequest({ ...request, content: e.target.value })}
        />
        <br />
        <br />
        <StyledSelect
          className="form-control"
          required
          id="type"
          value={request.type}
          onChange={(e) => setRequest({ ...request, type: e.target.value })}
        >
          <MenuItem value="Plumbing">Plumbing</MenuItem>
          <MenuItem value="Furniture Assembly">Furniture Assembly</MenuItem>
          <MenuItem value="Electrical">Electrical</MenuItem>
          <MenuItem value="Carpentry">Carpentry</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </StyledSelect>
        <br />
        <br />
        <StyledButton variant="contained" color="primary" type="submit">
          Ask for Help
        </StyledButton>
      </form>
    </div>
  );
};

export default CreateRequest;
