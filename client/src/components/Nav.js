import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
  const { logout, currentUser } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
        {currentUser.role === 'Helpee' && (
          <>
            <MenuItem onClick={handleClose}>Get Help</MenuItem>
            <MenuItem onClick={handleClose}>My Requests</MenuItem>
          </>
        )}
        {currentUser.role === 'Helper' && (
          <MenuItem onClick={handleClose}>Requests</MenuItem>
        )}
        <MenuItem onClick={handleClose}>My Reviews</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Nav;
