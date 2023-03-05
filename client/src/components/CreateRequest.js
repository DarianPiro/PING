import React, { useContext } from 'react';
import { Context } from '../Context';
import { Button, TextField, Typography, Select, MenuItem } from '@mui/material';

const CreateRequest = () => {
  const { request, setRequest, handleRequest } = useContext(Context);
  return (
    <div>
      <Typography variant="h4">
        State your <span className="orange"> problem</span>!
      </Typography>
      <form onSubmit={handleRequest}>
        <br />
        <TextField
          required
          label="Request"
          inputProps={{ maxLength: 140 }}
          maxRows={4}
          minRows={2}
          multiline
          variant="outlined"
          value={request.content}
          onChange={(e) => setRequest({ ...request, content: e.target.value })}
        />
        <br />
        <br />
        <Select
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
        </Select>
        <br />
        <br />
        <Button
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
          Ask for Help
        </Button>
      </form>
    </div>
  );
};

export default CreateRequest;
