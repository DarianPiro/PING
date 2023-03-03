import React, { useContext } from 'react';
import { Context } from '../Context';
import { Button } from '@mui/material';

const CurrentRequests = () => {
  const { onlineUsers, callUser } = useContext(Context);

  return (
    <div>
      <h2>Users waiting</h2>
      {onlineUsers.map((user) => (
        <Button
          key={user.socketID}
          onClick={() => callUser(user.socketID)}
          variant="contained"
          style={{
            color: '#8793a2',
            fontWeight: 'bold',
            backgroundColor: '#2d3b4c',
            margin: '10px',
          }}
        >
          {user.username}
        </Button>
      ))}
    </div>
  );
};

export default CurrentRequests;
