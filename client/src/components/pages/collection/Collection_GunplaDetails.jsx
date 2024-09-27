import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import '../../pages/user/details/Details.css';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdNotInterested } from "react-icons/md";
import { read, rateProduct, addToCollection, removeFromCollection } from '../../../functions/product';
import { format } from 'date-fns';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';  // Import useSelector to get auth details

const Collection_GunplaDetails = () => {
  const [value, setValue] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => ({ ...state }));  // Get logged-in user details from Redux store
  const [inCollection, setInCollection] = useState(false); // State to track if the product is in user's collection

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await read(id);
        setProduct(response.data);


        // Check if the user has already rated this product
        if (response.data.ratings) {
          // const userToken = user.user.token
          //find user by token to userid and the const userID
          const userRating = response.data.ratings.find(r => r.postedby._id === user.user._id);
          console.log("userRating:",userRating)
          console.log("user.user._id:",user.user._id)
          console.log("user.user.token:",user.user.token)
          if (userRating) {
            setValue(userRating.star);
          }else {
            // Reset the value state if the current user hasn't rated the product
            setValue(null);
          }
        }

        setLoading(false);
      } catch (err) {
        setError('Error fetching product data');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user.user]);

  useEffect(() => {
    const checkCollection = async () => {
      try {
        if (!user.user) return; // Ensure user is logged in
        const response = await axios.get(`${process.env.REACT_APP_API}/collection`, {
          headers: {
            authtoken: user.user.token
          }
        });
        // Check if the product is in the user's collection
        const isInCollection = response.data.some(item => item._id === id);
        setInCollection(isInCollection);
      } catch (err) {
        console.error('Error checking collection:', err);
      }
    };

    checkCollection();
  }, [id, user.user]);
  

  const handleAddToCollection = async () => {
    try {
      if (!inCollection) {
        await addToCollection(id, user.user.token);
        // Optionally, you can show a success message or update UI
        console.log('Product added to collection successfully');
        setInCollection(true); // Update state to reflect the change
      } else {
        await removeFromCollection(id, user.user.token); // Call removeFromCollection function if the product is already in the collection
        // Optionally, you can show a success message or update UI
        console.log('Product removed from collection successfully');
        setInCollection(false); // Update state to reflect the change
      }
    } catch (err) {
      console.error('Error handling collection action:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const formatReleaseDate = (dateString) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'dd MMMM yyyy');
  };

  const renderRating = () => {
    const totalRatings = product.ratings ? product.ratings.length : 0;
    if (totalRatings === 0) {
      return "No Rating";
    } else {
      return <p>{`${product.totalrating.toFixed(1)} Star `}<span style={{ color: 'black', fontSize: '12px', fontWeight: '500' }}>({totalRatings} rating{totalRatings > 1 ? 's' : ''})</span></p>;
    }
  };

  const handleRatingChange = async (event, newValue) => {
    if (newValue === null) {
      return;
    }
    setValue(newValue);

    try {
      console.log('User token:', user.user.token);
      const response = await rateProduct({
        star: newValue,
        prodId: id
      }, user.user.token);

      setProduct(response.data);  // Update the product data with the new rating
    } catch (err) {
      console.error('Error submitting rating:', err);
    }
  };

  return (
    <div className='small-containers single-product'>
      <Link to="/collection">{`< Back to My Collection`}</Link>
      <div className='pic-row'>
        {product.file && (
          <div>
            {product.file === 'noimage.jpg' ? (
              <img 
                src={`${process.env.REACT_APP_API}/uploads/noimage2.jpg`} 
                style={{ width: '400px', height: 'auto', maxHeight: '600px' }}
                />
              ) : (
              <img 
                src={`${process.env.REACT_APP_API}/uploads/${product.file}`} 
                alt={product.name}
                style={{ width: '400px', height: 'auto', maxHeight: '600px' }}
                />
              )}
          </div>
        )}
        <div className='col-2'>
          <h1>{product.name}</h1>
          <div className='testgod'>
            <Rating
              name="read-only"
              value={product.totalrating}
              readOnly
            />
            <p>{renderRating()}</p>
          </div>

          <h3>Gunpla Details</h3>
          <p>{product.detail}</p>

          <ul>
            <li>Release Date: <span>{formatReleaseDate(product.release_date)}</span></li>
            <li>Category: <span>{product.grade}</span></li>
            <li>Series: <span>{product.serie}</span></li>
            <li>Heights: <span>{product.height} cm</span></li>
            <li>Number of Runners: <span>{product.runner_num}</span></li>
            <li>Cons: <span>{product.cons}</span></li>
            <li>Decals: </li>
          </ul>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd', fontSize: '14px' }} className="styled-table">
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2', fontWeight: 'bold', color: '#333' }}>Foil</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2', fontWeight: 'bold', color: '#333' }}>Etching</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f2f2f2', fontWeight: 'bold', color: '#333' }}>Water</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#fff', color: '#333' }}>
                  {product.sticker.foil ? <IoIosCheckmarkCircle className="checkmark-icon" /> : <MdNotInterested className="not-interested-icon" />}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#fff', color: '#333' }}>
                  {product.sticker.etching ? <IoIosCheckmarkCircle className="checkmark-icon" /> : <MdNotInterested className="not-interested-icon" />}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#fff', color: '#333' }}>
                  {product.sticker.water ? <IoIosCheckmarkCircle className="checkmark-icon" /> : <MdNotInterested className="not-interested-icon" />}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="purchase-info">
            <button
              type="button"
              className="btn"
              style={{
                border: '1.5px solid #ddd',
                borderRadius: '25px',
                textAlign: 'center',
                padding: '0.45rem 0.8rem',
                outline: '0',
                marginRight: '0.2rem',
                marginBottom: '1rem',
                cursor: 'pointer',
                color: '#fff',
                backgroundColor: inCollection ? '#0D0D34' : '#fb2f38',
              }}
              onClick={handleAddToCollection}
            >
              {inCollection ? 'Remove from Collection' : 'Add to Collection'}
            </button>
            <div className='testgod2'>
              <p>Rate This Gunpla</p>
              <Rating
                name="controlled-rating"
                value={value}
                onChange={handleRatingChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection_GunplaDetails;
