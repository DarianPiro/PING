import React, { useContext } from 'react';
import { Context } from '../Context';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HomeIcon from '@mui/icons-material/Home';
import WeekendIcon from '@mui/icons-material/Weekend';
import PowerIcon from '@mui/icons-material/Power';
import ComputerIcon from '@mui/icons-material/Computer';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

const CurrentRequests = () => {
  const { onlineUsers, callUser, currentUser } = useContext(Context);

  return (
    <>
      <Typography variant="h3">
        {currentUser.username}, someone needs your{' '}
        <span className="orange"> help</span>!
      </Typography>
      <br />
      <div className="list">
        {onlineUsers.length > 0}
        <Typography variant="h4">Open requests</Typography>
        <List sx={{ width: 400, overflow: 'auto', maxHeight: 400 }}>
          {onlineUsers.map((user) => {
            return user.requests
              .filter((request) => request.status === 'Pending')
              .map((request) => {
                return (
                  <ListItem key={request._id}>
                    <ListItemAvatar>
                      <Avatar>
                        {request.type === 'Plumbing' && <PlumbingIcon />}
                        {request.type === 'Furniture Assembly' && <HomeIcon />}
                        {request.type === 'Electrical' && <PowerIcon />}
                        {request.type === 'Carpentry' && <WeekendIcon />}
                        {request.type === 'IT' && <ComputerIcon />}
                        {request.type === 'Other' && <BuildCircleIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={request.content}
                      secondary={user.username}
                      style={{ color: '#8793a2' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        color: '#8793a2',
                        fontWeight: 'bold',
                        backgroundColor: '#2d3b4c',
                        margin: '10px',
                      }}
                      onClick={() => callUser(user.socketID)}
                    >
                      Call
                    </Button>
                  </ListItem>
                );
              });
          })}
        </List>
      </div>
    </>
  );
};

export default CurrentRequests;
