import React, { useContext } from 'react';
import { Context } from '../Context';
import { Button, TextField, Typography, Select, MenuItem } from '@mui/material';

const Account = () => {
  const { currentUser, setCurrentUser, updateProfile } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    // updateProfile();
  };

  return (
    <div className="center">
      <Typography variant="h4">Account Settings</Typography>
      <form onSubmit={handleSubmit}>
        <br />
        <TextField
          label="Username"
          variant="outlined"
          value={currentUser.username}
          // style={{
          //   color: 'white',
          // }}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, username: e.target.value })
          }
        />
        <br />
        <br />
        <Select
          className="form-control"
          id="role"
          value={currentUser.role}
          // style={{
          //   color: 'white',
          // }}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, role: e.target.value })
          }
        >
          <MenuItem value="Helpee">Helpee</MenuItem>
          <MenuItem value="Helper">Helper</MenuItem>
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
          Update profile
        </Button>
      </form>
    </div>
  );
};

export default Account;
