import React, { useState, useEffect } from 'react';
import './Post.css';
import PostCard from './PostCard';
import { getDataTech } from '../../../../functions/technique';

const Post = () => {
  const [techniques, setTechniques] = useState([]);

  useEffect(() => {
    const fetchTechniques = async () => {
      try {
        const response = await getDataTech();
        setTechniques(response.data);
      } catch (error) {
        console.error('Error fetching techniques:', error);
      }
    };

    fetchTechniques();
  }, []);

  return (
    <div>
      <div className='posts clearfix'>
        <div className='main-posts'>
          <h1 className='recently-post-title'>All Techniques</h1>
          {techniques.map(technique => (
            <PostCard
              key={technique._id}
              id={technique._id}
              imageUrl={`${process.env.REACT_APP_API}/uploads/${technique.file}`}
              title={technique.title}
              content={technique.content}
              releaseDate={technique.release_date}
            />
          ))}
        </div>
        <div className='sidebar-posts'>        
          <div className='section-search'>
            <h1 className='section-title'>Search</h1>
            <form>
              <input type='text' name='search-posts' className='text-posts-input' placeholder='Search...'/>
            </form>
          </div>

          <div className='section-topics'>
            <h1 className='section-title'>All Techniques</h1>
            <ul>
              <li><a href='#'>Assembly Techniques</a></li>
              <li><a href='#'>Painting Techniques</a></li>
              <li><a href='#'>Cutline Techniques</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
