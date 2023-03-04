import React, { useEffect, useContext } from 'react';
import { Context } from '../Context';
import { Button, TextField, Select, MenuItem, Typography } from '@mui/material';

const Login = () => {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    loginWithRedirect,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context);

  useEffect(() => {
    if (isAuthenticated) {
      handleGetUser();
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated && (
        <div className="center">
          <Typography variant="h4">
            <p>
              You seem desperate.
              <br />
              We're here to <span className="orange">help</span>!
            </p>
          </Typography>

          <Button
            onClick={() => loginWithRedirect()}
            variant="contained"
            style={{
              color: '#b9c1c9',
              fontWeight: 'bold',
              backgroundColor: '#2d3b4c',
              margin: '10px',
            }}
          >
            Login
          </Button>
        </div>
      )}

      {isAuthenticated && !currentUser.registered && (
        <form className="form-group center" onSubmit={handleCreateUser}>
          <div>
            <Typography variant="h4">This is your first time here</Typography>
            <Typography variant="h6">Please enter a username</Typography>
            <TextField
              required
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={currentUser.username}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, username: e.target.value })
              }


            />
          </div>
          <div>
            <h3>Do you need help or are you a helper?</h3>
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
          </div>
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
            Create account
          </Button>
        </form>
      )}
    </>
  );
};

export default Login;
