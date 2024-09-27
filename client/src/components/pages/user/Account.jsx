import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoHeartCircleOutline } from "react-icons/io5";
import LOGO from '../../../assets/LOGO.png';
import { getCollection } from '../../../functions/product';
import { Link } from 'react-router-dom';
import './Account.css';

const Account = () => {
    const [role, setRole] = useState('');
    const [productCount, setProductCount] = useState(0);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user's collection
                const collectionResponse = await getCollection(user.token);
                console.log('Collection Response:', collectionResponse); // Debug log
                const productsInCollection = collectionResponse.data.products;
                console.log('Products in Collection:', productsInCollection); // Debug log
                // Set user's role and count of products in collection
                setRole(user.role);
                setProductCount(productsInCollection.length);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [user.token, user.role]);

    console.log('Role:', role); // Debug log
    console.log('Product Count:', productCount); // Debug log

    return (
        <div className='profile_body'>
            <div className="profile_card">
                <div className="img-avatar">
                    <img src={LOGO} alt="Avatar" />
                </div>
                <div className="card-text">
                    <div className="portada"></div>
                    <div className="title-total">
                        <div className="title"><Link to="/collection"><IoHeartCircleOutline /></Link></div>
                        <h2 className="nickname">Your Profile</h2>
                        <div className="desc">This is your profile passport, Please show this card to visit this website.</div>
                        <div className="descr">Role: {role}</div>
                        <div className="descr">Products in Collection: {productCount}</div>
                        <div className="actions">
                        <button className='btnc1'>Edit name</button>
                            <input type='text' className='changename' placeholder='Change name here'></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
