import React, { useEffect, useContext } from 'react';
import { Context } from '../Context';

const Login = () => {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    loginWithRedirect,
    logout,
    handleLogin,
    handleCreateUser,
  } = useContext(Context);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated');
      handleLogin();
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}

      {isAuthenticated && (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </button>
      )}

      {isAuthenticated && !currentUser.registered && (
        <div className="form-group">
          <div>
            <h2>This is your first time here</h2>
            <h3>Please enter a username</h3>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={currentUser.username}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, username: e.target.value })
              }
            />
          </div>
          <div>
            <h3>Do you need help or are you a helper?</h3>
            <select
              className="form-control"
              id="role"
              value={currentUser.role}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
            >
              <option value="Helpee">Helpee</option>
              <option value="Helper">Helper</option>
            </select>
          </div>
          <button onClick={() => handleCreateUser()}>Create User</button>
        </div>
      )}
    </>
  );
};

export default Login;
