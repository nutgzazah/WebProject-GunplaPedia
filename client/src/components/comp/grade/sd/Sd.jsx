import React from 'react'
import './Sd.css'
import LOGO from '../../../../assets/LOGO.png'
import { Link } from 'react-router-dom';


const Sd = () => {
  return (
    <div>
        <div class="bodygrade">
        <section class="home">
            <div class="home-content">
                <h1>WELCOME TO GUNPLAPEDIA</h1>
                <h3>The world of builder</h3>
                <p>We have comprehensive information on each Gunpla. Including the advantages and disadvantages of each. 
                  There will be a section teaching techniques for assembling and painting Gunpla. 
                  And users can create a collection of Gunpla that they already own.</p>
                <div class="btn-box">
                    <a href='#'><Link to="/login">Login</Link></a>
                    <a href='#'><Link to="/register">Signup</Link></a>
                </div>
            </div>
            <div class="home-img">
              <img src = {LOGO}/>
            </div>

        </section>
        </div>
    </div>
  )
}

export default Sd
