import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import {
  Modal,
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
const { DateTime } = require('luxon');

const RequestDetailsModal = ({ request, isOpen, handleClose }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="center modal">
        <Typography variant="h4" gutterBottom>
          {request.content}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <b>Category:</b> {request.type}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          <b> Date:</b>{' '}
          {DateTime.fromISO(request.date).toLocaleString(DateTime.DATETIME_MED)}
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          <b>Status:</b> {request.status}
        </Typography>
      </div>
    </Modal>
  );
};

const PastRequests = () => {
  const { currentUser, handleGetUser } = useContext(Context);

  useEffect(() => {
    handleGetUser();
  }, []);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenRequestDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseRequestDetails = () => {
    setSelectedRequest(null);
  };

  return (
    <>
      <Typography variant="h4">Your requests</Typography>
      <List sx={{ width: 400, overflow: 'auto', maxHeight: 400 }}>
        {currentUser.requests.map((request) => {
          return (
            <ListItem
              key={request._id}
              button
              onClick={() => handleOpenRequestDetails(request)}
            >
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
      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          isOpen={Boolean(selectedRequest)}
          handleClose={handleCloseRequestDetails}
        />
      )}
    </>
  );
};

export default PastRequests;
