import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaBook } from "react-icons/fa";

const PostCard = ({ id,title, content, releaseDate, imageUrl }) => {
  return (
    <div className='post'>
      <img src={imageUrl} className='posts-image' alt='Post'/>
      <div className='posts-preview'>
        <h1 className='head-preview'><Link to={`/techniques/${id}`}>{title}</Link></h1>
      <span style={{color: 'red', marginRight:'10px'}}><FaBook /> : Article</span>
      <span style={{color: 'red'}}><FaCalendar /> : {new Date(releaseDate).toLocaleDateString()}</span>
        <p className='preview-text'>
          {content}
        </p>
        <Link to={`/techniques/${id}`} className='btn-posts see-more'>See More</Link>
      </div>
    </div>
  );
};

export default PostCard;
