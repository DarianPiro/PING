import React, { useContext } from 'react';
import { Context } from '../Context';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Box,
} from '@mui/material';
import { StyledButton } from './ui/StyledComponents';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HomeIcon from '@mui/icons-material/Home';
import WeekendIcon from '@mui/icons-material/Weekend';
import PowerIcon from '@mui/icons-material/Power';
import ComputerIcon from '@mui/icons-material/Computer';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

const CurrentRequests = () => {
  const { onlineUsers, callUser, currentUser } = useContext(Context);

  return (
    <Box className="center">
      <Typography variant="h4">
        {currentUser.username}, someone needs your{' '}
        <span className="orange"> help</span>!
      </Typography>
      <br />

      <Typography variant="h5">Open requests</Typography>
      {onlineUsers.length === 0 && (
        <Box className="center" sx={{mt: '10rem'}}>
          <CircularProgress />
        </Box>
      )}
      <List
        sx={{
          mt: 5,
          width: '80vw',
          overflow: 'auto',
          maxHeight: '95vw',
        }}
      >
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
                    primaryTypographyProps={{
                      color: '#8793a2',
                      fontWeight: 'bold',
                    }}
                    secondaryTypographyProps={{ color: '#8793a2' }}
                  />
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => callUser(user.socketID)}
                  >
                    Call
                  </StyledButton>
                </ListItem>
              );
            });
        })}
      </List>
    </Box>
  );
};

export default CurrentRequests;
