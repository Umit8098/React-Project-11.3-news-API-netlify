import React from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useNavigate } from 'react-router-dom';

import { logOut } from "../utils/firebase"; // firebase.js dosyasından

// redux-toolkit'ten user bilgisi alınacak;
import { useSelector } from 'react-redux';



export default function Navbar() {
  // const currentUser = true;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  // const {user} = useSelector( (state) => state.auth );
  const currentUser = useSelector( (state) => state.auth.user );
  // console.log(currentUser);

  const mode = useSelector((state) => state.theme.mode);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate('/');
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    await logOut();
    navigate("/login"); // logout sonrası login sayfasına yönlendir
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static"
        color='default'
        sx={{ backgroundColor: mode === "light" ? "#8dc8f5ff" : "#222" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}>
            UmitDev News
          </Typography>
          {currentUser ? (

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography 
                    variant="subtitle1" 
                    component="span" 
                    sx={{ marginRight: 1 }}
                >
                    {currentUser?.displayName || 'User'}
                </Typography>
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                    News
                </MenuItem>
                
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>

              </Menu>
            </div>

          ) : (
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleRegister}
                color="inherit"
            >
                <Typography 
                    sx={{ marginRight: 0.5 }}
                >
                    Register
                </Typography>
                <LockOpenIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    // </Box>
  );
}