import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import {
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

const PastRequests = () => {
  const { currentUser, handleGetUser } = useContext(Context);

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <Typography variant="h4">Your requests</Typography>
      <List sx={{ width: 400, overflow: 'auto', maxHeight: 400 }}>
        {currentUser.requests.map((request) => {
          return (
            <ListItem>
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
                secondary={request.status}
              />
            </ListItem>
          );
        })}{' '}
      </List>
    </>
  );
};

export default PastRequests;
