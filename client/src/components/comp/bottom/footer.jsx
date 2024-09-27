import React from 'react';
import './Footer.css';
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import LOGO from '../../../assets/LOGO.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div class="footerbody">
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <img src={LOGO} className = 'logo'alt="" width="200" height="115" />
              <p className="pfoot">We have comprehensive information on each Gunpla. Including the advantages and disadvantages of each. There will be a section teaching techniques for assembling and painting Gunpla. And users can create a collection of Gunpla that they already own.</p>
            </div>
            <div className="footer-col">
              <h4>company</h4>
              <ul className='ul-foot'>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">about us</a></li>
                <li><a href="#">our services</a></li>
                <li><a href="#">privacy policy</a></li>
                <li><a href="#">affiliate program</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Useful Links</h4>
              <ul className='ul-foot'>
                <li><a href="#"><Link to="/">Home</Link></a></li>
                <li><a href="#"><Link to="/gunpla">All Gunpla</Link></a></li>
                <li><Link to="/techniques">Techniques</Link></li>
                <li><Link to="/collection">My collection</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact us</h4>
              <div className="social-links">
                <a href="#"><FaInstagram/></a>
                <a href="#"><FaFacebookSquare /></a>
                <a href="#"><FaSquareXTwitter/></a>
                <a href="#"><FaLinkedin /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;