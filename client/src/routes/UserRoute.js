import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const UserRoute = ({children}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state)=>({...state}))
  console.log('UserRoute',user)
    //check if user login yet
    
    useEffect(() => {
      // Check if user is not logged in, then navigate to /login
      if (!user || !user.user || !user.user.token) {
        navigate('/login');
      }
    }, [user, navigate]);

  return user && user.user && user.user.token ? (
    <>
      {children}
    </>
  ) : null; // Return null or a loading spinner if you prefer while redirecting
};

export default UserRoute
