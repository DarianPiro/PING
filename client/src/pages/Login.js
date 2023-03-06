import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Context';
import { getTaglines } from '../lib/ApiService';
import { MenuItem, Typography } from '@mui/material';
import {
  StyledTextField,
  StyledSelect,
  StyledButton,
} from '../components/ui/StyledComponents';

const Login = () => {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    loginWithRedirect,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context);
  const [taglines, setTaglines] = useState([]);

  // useEffect(() => {
  //   const getTaglines = async () => {
  //     const data = await getTaglines();
  //     setTaglines(data);
  //   }
  //   getTaglines();
  // }, []);

  useEffect(() => {
    if (isAuthenticated) {
      handleGetUser();
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated && (
        <div className="center">
          <Typography variant="h4" >
            <p>
              {/* {taglines[Math.floor(Math.random() * taglines.length)]} */}
              You seem desperate.
              <br />
              We're here to <span className="orange">help</span>!
            </p>
          </Typography>

          <StyledButton
            onClick={() => loginWithRedirect()}
            variant="contained"
            sx={{
              color: '#b9c1c9',
              fontWeight: 'bold',
              backgroundColor: '#2d3b4c',
              margin: '10px',
            }}
          >
            Login
          </StyledButton>
        </div>
      )}

      {isAuthenticated && !currentUser.registered && (
        <form className="form-group center" onSubmit={handleCreateUser}>
          <div>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>This is your first time here</Typography>
            <Typography variant="h6" >Enter a username</Typography>
            <StyledTextField
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
            <Typography variant="h6" sx={{ m: '1rem' }} >Do you need help or are you a helper?</Typography>
            <StyledSelect
              className="form-control"
              id="role"
              value={currentUser.role}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
            >
              <MenuItem value="Helpee">Helpee</MenuItem>
              <MenuItem value="Helper">Helper</MenuItem>
            </StyledSelect>
          </div>
          <StyledButton
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              color: '#8793a2',
              fontWeight: 'bold',
              backgroundColor: '#2d3b4c',
              margin: '10px',
            }}
          >
            Create account
          </StyledButton>
        </form>
      )}
    </>
  );
};

export default Login;
