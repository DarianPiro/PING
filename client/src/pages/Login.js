import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Context';
import { getTaglines } from '../lib/ApiService';
import { MenuItem, Typography, CircularProgress } from '@mui/material';
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
    initialFetch,
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
    <div className="center">
      {!isAuthenticated && (
        <div>
          <Typography variant="h4">
            <p>
              {/* {taglines[Math.floor(Math.random() * taglines.length)]} */}
              You seem desperate.
              <br />
              We're here to <span className="orange">help</span>!
            </p>
          </Typography>

          <StyledButton onClick={() => loginWithRedirect()} variant="contained">
            Login
          </StyledButton>
        </div>
      )}

      {isAuthenticated && initialFetch && !currentUser.registered && (
        <form className="form-group" onSubmit={handleCreateUser}>
          <div>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              This is your first time here
            </Typography>
            <Typography variant="h6">Enter a username</Typography>
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
            <Typography variant="h6" sx={{ m: '1rem' }}>
              Do you need help or are you a helper?
            </Typography>
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
          <br />
          <br />
          <StyledButton variant="contained" color="primary" type="submit">
            Create account
          </StyledButton>
        </form>
      )}
      {isAuthenticated && !initialFetch && <CircularProgress />}
    </div>
  );
};

export default Login;
