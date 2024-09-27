import React from 'react'
import './Services.css'
import { IoIosInformationCircle } from "react-icons/io";
import { BsCollectionFill } from "react-icons/bs";
import { FaPaintBrush } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div>
      <section className='services'>
        <h2 className="heading-mean">Our <span>Services</span></h2>
        <div className='services-container'>
            <div className='services-box'>
                <IoIosInformationCircle style={{ fontSize: '7rem' }}/>
                <h3>Gunpla Information</h3>
                <p> There is complete detailed information on each Gunpla model. What sector is it in? A product description that includes technical information such as size, 
                  grade, and release date. Features highlighting the strengths of that Gunpla model and its 
                  advantages and disadvantages, which is a review of the quality of the parts. Difficulty in assembly structural strength, etc.</p>
                <a href='#' className='btn-services'><Link to="/gunpla">See More</Link></a>
            </div>

            <div className='services-box'>
                <BsCollectionFill style={{ fontSize: '7rem' }}/>
                <h3>Builder Collection</h3>
                <p>The collection save feature allows users to add Gunpla they own to their personal collections. There is also a collection management feature that allows users to sort, edit, or 
                  delete Gunpla in their personal collections according to their preferences. 
                  and a collection sharing feature that allows users to share their collections with friends. or in the community of people interested in Gunpla as well</p>
                <a href='#' className='btn-services'><Link to="/collection">See More</Link></a>
            </div>

            <div className='services-box'>
                <FaPaintBrush style={{ fontSize: '7rem' }}/>
                <h3>A&P Techniques</h3>
                <p> Assembly: Cutting Techniques  Using tools and assembling various parts Make it tight and form-fitting.
Painting: Choosing colors Techniques for spray painting, brushing, using Masking Tape, applying lacquer, and weathering to increase realism.
Additional decorations: Decal, panel lining and other customizations</p>
                <a href='#' className='btn-services'><Link to="/techniques">See More</Link></a>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Services
