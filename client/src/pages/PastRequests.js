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
  Box,
} from '@mui/material';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HomeIcon from '@mui/icons-material/Home';
import WeekendIcon from '@mui/icons-material/Weekend';
import PowerIcon from '@mui/icons-material/Power';
import ComputerIcon from '@mui/icons-material/Computer';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ImageStack from '../components/ui/ImageStack';
const { DateTime, Duration } = require('luxon');

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
  const [expandedItem, setExpandedItem] = useState(null);

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
    <Box className="center">
      <Typography variant="h4" sx={{ mt: '1.5rem' }}>
        Past requests
      </Typography>
      <List sx={{ width: '90vw', overflow: 'auto', maxHeight: '77vh' }}>
        {currentUser.requests.map((request) => {
          return (
            <Box key={request._id}>
              <ListItem button onClick={() => setExpandedItem(request._id)}>
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
                  primaryTypographyProps={{
                    color: '#8793a2',
                    fontWeight: 'bold',
                  }}
                  secondaryTypographyProps={{ color: '#8793a2' }}
                />
              </ListItem>
              {expandedItem === request._id && (
                <ListItem>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#8793a2', mr: '1rem' }}
                  >
                    <b>Date</b> <br />
                    {DateTime.fromISO(request.date).toFormat('dd.MM')}
                  </Typography>
                  {/* {request.review.time && (
                    <Typography
                      variant="subtitle2"
                      sx={{ color: '#8793a2', mr: '1rem' }}
                    >
                      <b>Length</b> <br />
                      {Duration.fromISO(request.review.time).toFormat('mm:ss')}
                    </Typography>
                  )} */}
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#8793a2', mr: '1rem' }}
                  >
                    <b>Category</b> <br /> {request.type}
                  </Typography>
                  <Box sx={{ width: '10vw' }}>
                    <ImageStack screenshots={request.images} />
                  </Box>
                </ListItem>
              )}
            </Box>
          );
        })}{' '}
      </List>
      {/* {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          isOpen={Boolean(selectedRequest)}
          handleClose={handleCloseRequestDetails}
        />
      )} */}
    </Box>
  );
};

export default PastRequests;
