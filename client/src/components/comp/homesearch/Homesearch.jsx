import React from 'react'
import './Homesearch.css'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Homesearch = () => {
  return (
    <div className='hsearch'>
        <h2>Let us help you find the right gunpla for you!</h2>
        <div className="btn-box-mean"><Link to="/gunpla">
            <a href='#'>Click to explore</a></Link>
        </div>
    </div>
  )
}

export default Homesearch
