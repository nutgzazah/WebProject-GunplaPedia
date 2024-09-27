import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/userSlice';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate('/');
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      title: 'Profile',
      icon: '',
      to: '/account',
      onClick: () => navigate('/account')
    },
    {
      title: 'Logout',
      icon: '',
      to: '#',
      onClick: handleLogout
    }
  ];

  if (user.user && user.user.role === 'admin') {
    settings.unshift({
      title: 'Dashboard',
      to: '/admin/index',
      onClick: () => navigate('/admin/index')
    });
  }

  return (
    <div className="heroes">
      <nav>
        <h2 className="logoes"><Link to="/"> <span className="white-text">Gunpla</span> <span className="red-text">Pedia</span></Link></h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/gunpla">Gunpla</Link></li>
          <li><Link to="/techniques">Techniques</Link></li>
          <li><Link to="/collection">My Collection</Link></li>    
        </ul>
        {user.user.length === 0 ? (
          <Link to="/login"><button type="button" className="log-nav">Login</button></Link>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://obs.line-scdn.net/0hSo0b4ow9DEANGx4MvxpzFzVNADE-fRZJLy9HcSgYB3EgN0wVZipfIy8fW2wpIksVLXgUciEcWnZzKEoXMA/w1200" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    setting.onClick();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
