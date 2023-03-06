import React, { useState, useContext } from 'react';
import { Context } from '../../Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
  const { logout, currentUser, setCurrentPage } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    if (event.target.getAttribute('data-key'))
      setCurrentPage(event.target.getAttribute('data-key'));
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin },
    });
  };

  return (
    <div className="nav">
      <MenuIcon
        id="basic-button"
        fontSize="large"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        cursor="pointer"
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {currentUser.role === 'Helpee' && [
          <MenuItem key="1" data-key="Request" onClick={handleClose}>
            Get Help
          </MenuItem>,
          <MenuItem key="2" data-key="PastRequests" onClick={handleClose}>
            Requests
          </MenuItem>,
        ]}
        {currentUser.role === 'Helper' && (
          <>
            <MenuItem key="3" data-key="Request" onClick={handleClose}>
              Requests
            </MenuItem>
            <MenuItem key="4" data-key="Insights" onClick={handleClose}>
              Insights
            </MenuItem>
          </>
        )}

        <MenuItem key="5" data-key="Account" onClick={handleClose}>
          Account
        </MenuItem>
        <MenuItem key="6" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Nav;
