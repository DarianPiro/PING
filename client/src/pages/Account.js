import React, { useContext } from 'react';
import { Context } from '../Context';
import { Button, TextField, Typography, Select, MenuItem } from '@mui/material';

const Account = () => {
  const { currentUser, setCurrentUser, handleUpdateUser } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser();
  };

  return (
    <div className="center">
      <Typography variant="h4">Account Settings</Typography>
      <form onSubmit={handleSubmit}>
        <br />
        <TextField
          label="Username"
          className="input"
          variant="outlined"
          value={currentUser.username}
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
          type="submit"
          variant="contained"
          style={{
            color: '#b9c1c9',
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
