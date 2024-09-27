import React from "react";
import "./Background.css"
import Hinu from '../../../assets/3m.jpg'
import { Link } from 'react-router-dom'

const Background = () => {
  return (
    <div className = "banner">
      <section className="meaning" id="meaning">
        <h2 className="heading-mean">What is <span>Gunpla?</span></h2>
        <div className="meaning-img">
          <img src = {Hinu}/>
          <span className="circles-spin"></span>
        </div>

        <div className = "meaning-content">
          <p>GUNPLA is an abbreviation for Gundam Plastic Model. It is a model that comes 
            from the Anime Gundam produced by Bandai in Japan. GUNPLA models are divided into grades 
            and ratios.There are various things to buy and choose from. Depends on your preferences</p>
        <div className="btn-box-mean"><a href='#'><Link to="/techniques">
          You're new as builder?</Link></a>
          </div>
        </div>
      </section>
    </div>
);
}

export default Background;