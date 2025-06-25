import {useState, useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from '../contexts/auth';
import LoginIcon from '@mui/icons-material/Login';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ darkMode, onToggleTheme }) {
  const { user, isAuthed } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(false);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/logout');
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  useEffect(() => {
    // Cleanup function to reset accountAnchorEl when component unmounts or user signs in
    return () => {
      setAccountAnchorEl(null);
    };
  }, [isAuthed]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box display="flex"
          alignItems="center" width="100%">
          <IconButton component={NavLink} to="/" color="inherit">
            <HomeIcon />
          </IconButton>
          
          {isAuthed && (
            <>
              <IconButton
                size="large"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={NavLink} to="/instruments" onClick={handleMenuClose}>
                  Instruments
                </MenuItem>
                <MenuItem component={NavLink} to="/tunings" onClick={handleMenuClose}>
                  Tunings
                </MenuItem>
                <MenuItem component={NavLink} to="/notes" onClick={handleMenuClose}>
                  Notes
                </MenuItem>
                <MenuItem component={NavLink} to="/about" onClick={handleMenuClose}>
                  About us
                </MenuItem>
              </Menu>
            </>
          )}

          <Button component={NavLink} to="/tuner" color="inherit">
            <Typography variant="button">Tuner</Typography>
          </Button>
          <Box flexGrow={1} />
          <IconButton color="inherit" onClick={onToggleTheme}>
            {darkMode ? <Brightness7Icon /> : <DarkModeIcon />}
          </IconButton>

          {isAuthed &&(
            <>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleAccountMenuOpen}
                  size="small"
                  sx={{ ml: 2 }}
                  data-cy="account_btn"
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.firstname.toUpperCase().split('')[0] + user?.lastname.toUpperCase().split('')[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={accountAnchorEl}
                id="account-menu"
                open={Boolean(accountAnchorEl)}
                onClose={handleAccountMenuClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleAccountMenuClose}>
                  <Avatar /> {user?.firstname} {user?.lastname}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleAccountMenuClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}
                  data-cy="logout_btn">
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>)}

          {!isAuthed && (
            <IconButton component={NavLink} to="/login" color="inherit" data-cy="login_btn">
              <LoginIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}