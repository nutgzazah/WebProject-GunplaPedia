import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blogtech.css';
import { useParams } from 'react-router-dom';
import { readTech } from '../../../../functions/technique'; // Import the readTech function

const Blogtech = () => {
  const [technique, setTechnique] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnique = async () => {
      try {
        const response = await readTech(id); // Replace 'your_technique_id_here' with the actual ID
        setTechnique(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching technique:', error);
        setLoading(false);
      }
    };

    fetchTechnique();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (!technique) {
    return <div>Error fetching technique data.</div>; // Display error message if fetching fails
  }

  return (
    <div className='blog-wrapper'>
      <div className='posts clearfix'>
        <div className='main-posts single'>
        <Link to="/techniques">{`< Back to All Techniques`}</Link>
          <h1 className='recently-post-title'>{technique.title}</h1>
          <img src={`${process.env.REACT_APP_API}/uploads/${technique.file}`}style={{maxWidth: '100%', height: 'auto', maxHeight: '600px'}} alt="Technique Image" />
          <div className='posts-article'>
            <p>{technique.content}</p>
          </div>
        </div>

        <div className='sidebar-posts single'> 
          {/* Sidebar content */}
        </div>
      </div>
    </div>
  );
};

export default Blogtech;
