import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Back2 from './Back2.jpg'
import './Carouseltech.css'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}


const Carouseltech = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  return (
      <div className="pst-wrapper">
        <div className="container">
          <Slider {...settings}>
            <div className="card">
              <img src = {Back2} className="card-img"/>
              <div className="card-info">
                <h3><a href="#">1stick</a></h3>
                <p>We use react stick</p>
              </div>
            </div>
            <div className="card">
              <img src = {Back2} className="card-img"/>
              <div className="card-info">
                <h3><a href="#">2stick</a></h3>
                <p>We use react stick</p>
              </div>
            </div>
            <div className="card">
              <img src = {Back2} className="card-img"/>
              <div className="card-info">
                <h3><a href="#">3stick</a></h3>
                <p>We use react stick</p>
              </div>
            </div>
            <div className="card">
              <img src = {Back2} className="card-img"/>
              <div className="card-info">
                <h3><a href="#">4stick</a></h3>
                <p>We use react stick</p>
              </div>
            </div>
            <div className="card">
              <img src = {Back2} className="card-img"/>
              <div className="card-info">
                <h3><a href="#">5stick</a></h3>
                <p>We use react stick</p>
              </div>
            </div>
            <div className="card">
              <img src = {Back2} className="card-img"/>
              <div className="card-info">
                <h3><a href="#">6stick</a></h3>
                <p>We use react stick</p>
              </div>
            </div> 
          </Slider>
        </div>
        
      </div>
  );
  
}

export default Carouseltech
