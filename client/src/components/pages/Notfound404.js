import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import './Notfound.css'


export default function Notfound404() {
  return (
    <div  className="notfound-container">
        <div className="notfound-header">
          <h1>404</h1>
          <h3>Page Not Found!</h3>
        </div>
        <img src="https://www.pngall.com/wp-content/uploads/15/Gundam-PNG-Image.png" alt="not found" />
        <div class="notfound-footer">
        <p>
          We're sorry, the page you requested could not be found. Please go back
          to the homepage!
        </p>
        <button><Link to="/"><span className="white-text">Go Home</span></Link></button>
      </div>
    </div>
  );
}