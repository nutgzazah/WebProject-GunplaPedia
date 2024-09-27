import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { currentAdmin } from '../functions/auth';
import SideBar from '../layout/SideBar';
import HeaderBar from '../layout/HeaderBar';
import { Box } from '@mui/material';

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // Check if user is not logged in, then navigate to /logins
    if (!user || !user.user || !user.user.token) {
      navigate('/login');
    } else {
      // Check if the user is an admin
      currentAdmin(user.user.token).then(response => {
        setOk(true);
      }).catch((err) => {
        console.log(err);
        navigate('/gunpla'); 
      });
    }
  }, [user, navigate]);

  return ok ? (

    <div className="app" style={{display : 'flex'}}>
      <div style={{position: 'sticky',top: 0,height: '100vh', zIndex: 100 }}>
        <SideBar/>
      </div>
      <main className="content">
        <div className="content_body">
          <Box m="20px">
            {children}
          </Box>
        </div>
      </main>
    </div>
  ) : null; // Render null or a loading spinner while checking permissions
}

export default AdminRoute;
