import React from 'react'
import './Gsearch.css'
import { FaSearch } from "react-icons/fa";

const Gsearch = ({handleInputChange, query}) => {
  return (
    <div className="gsearch-wrap">
      <div className="search-bar">
        <FaSearch className="faSearch"/>
        <input
          type="text"
          className="search-input"
          onChange={handleInputChange}
          value={query}
          placeholder="Which gunpla are you looking for?"
        />
      </div>
    </div>
  )
}

export default Gsearch