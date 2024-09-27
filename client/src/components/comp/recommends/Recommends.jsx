import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom'; 
import { getdata } from '../../../functions/product';
import './Recommends.css';

const Recommends = () => {
  const [topGunpla, setTopGunpla] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopGunpla = async () => {
      try {
        const response = await getdata(); // Assuming this fetches all Gunpla data
        const sortedGunpla = response.data.sort((a, b) => {
          if (a.totalrating !== b.totalrating) {
            return b.totalrating - a.totalrating;
          }
          if (a.ratings.length !== b.ratings.length) {
            return b.ratings.length - a.ratings.length;
          }
          return new Date(b.release_date) - new Date(a.release_date);
        });
        const top10Gunpla = sortedGunpla.slice(0, 10);
        setTopGunpla(top10Gunpla);
        setLoading(false);
      } catch (err) {
        setError('Error fetching top Gunpla');
        setLoading(false);
      }
    };

    fetchTopGunpla();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const renderProductCard = ({ _id, file, name, totalrating, ratings }) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        if (i < totalrating) {
          stars.push(<strong key={i}><FaStar /></strong>);
        } else {
          stars.push(<strong key={i}><FaStar style={{ color: '#ddd' }} /></strong>);
        }
      }
      return stars;
    };
  
    return (
    <Link to={`/gunpla/${_id}`} key={_id}> 
      <div className='products'>
        <div className='godd'>
          <img 
          className='godd2'
          src={`${process.env.REACT_APP_API}/uploads/${file}`} 
          alt={name}
          />
        </div>
        <div className='recom-details'>
          <p>
            <b>{name}</b><br />
          </p>
        </div>
        <div className='recom-button'>
          <p className='star'>
            {renderStars()} <small style={{ color: 'black', fontSize: '14px' }}><span style={{ fontSize: '16px' }}>{totalrating.toFixed(1)}</span>({ratings.length})</small>
          </p>
        </div>
      </div>
      </Link>
    );
  };
  

  return (
    <div className='main-recommend'>
      <header>
        <h1>Top Recommend Gunpla</h1>
      </header>
      <section>
        {topGunpla.map(renderProductCard)}
      </section>
    </div>
  );
}

export default Recommends;
