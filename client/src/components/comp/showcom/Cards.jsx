import React, { useState, useEffect } from 'react';
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { addToCollection, removeFromCollection } from '../../../functions/product';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Card = ({ baselink,id, img, name, star, totalrating, ratings }) => {
  const [inCollection, setInCollection] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const checkCollection = async () => {
      try {
        if (!user.user) return;
        const response = await axios.get(`${process.env.REACT_APP_API}/collection`, {
          headers: {
            authtoken: user.user.token
          }
        });
        const isInCollection = response.data.some(item => item._id === id);
        setInCollection(isInCollection);
      } catch (err) {
        console.error('Error checking collection:', err);
      }
    };

    checkCollection();
  }, [id, user.user]);

  const handleClick = () => {
    navigate(`/${baselink}/${id}`);
  };

  const handleCollectionClick = async (e) => {
    e.stopPropagation(); // Prevent navigation when button is clicked
    try {
      if (!inCollection) {
        await addToCollection(id, user.user.token);
        console.log('Product added to collection successfully');
        setInCollection(true);
      } else {
        await removeFromCollection(id, user.user.token);
        console.log('Product removed from collection successfully');
        setInCollection(false);
      }
    } catch (err) {
      console.error('Error handling collection action:', err);
    }
  };

  const ratingCount = ratings.length;

  return (
    <section className="cards" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="img-container">
      {img === 'noimage.jpg' ? (
        <img 
          src='noimage2.jpg'
          className="cards-img"
          />
          ) : (
        <img 
          src={img} className="cards-img" 
          alt={name}
          >
          </img>
        )}
      </div>
      <div className="card-details">
        <h3 className="card-name">{name}</h3>
        <section className="card-reviews">
          {totalrating > 0 ? (
            <>
              {Array.from({ length: Math.round(star) }).map((_, index) => (
                <AiFillStar key={index} style={{ color: 'rgb(252, 186, 3)' }} />
              ))}
              <span className="totalrating">{totalrating.toFixed(1)}</span>
              <span className="rating-count" style={{ fontSize: '12px', marginRight: '12px' }}> ({ratingCount})</span>
            </>
          ) : (
            <span>No Rating</span>
          )}
          <button
            className="product-button"
            onClick={handleCollectionClick}
            style={{
              backgroundColor: inCollection ? '#0D0D34' : '#fb2f38',
              fontSize: inCollection ? '10px' : '13px',
              cursor: 'pointer',
            }}
          >
            {inCollection ? 'Remove from Collection' : 'Add to Collection'}
          </button>
        </section>
      </div>
    </section>
  );
};

export default Card;
