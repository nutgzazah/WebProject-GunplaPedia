import React, { useState, useEffect } from 'react';
import './Newbietech.css';
import { FaBook } from "react-icons/fa";
import { getDataTech } from '../../../../functions/technique'; // Adjust the import path if necessary
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Newbietech = () => {
  const [techniques, setTechniques] = useState([]);

  useEffect(() => {
    const fetchTechniques = async () => {
      try {
        const response = await getDataTech();
        // Shuffle the techniques array randomly
        const shuffledTechniques = response.data.sort(() => Math.random() - 0.5);
        // Select the first three techniques from the shuffled array
        const randomThreeTechniques = shuffledTechniques.slice(0, 4);
        setTechniques(randomThreeTechniques);
      } catch (error) {
        console.error('Error fetching techniques:', error);
      }
    };

    fetchTechniques();
  }, []);

  return (
    <div>
      <section id="noob">
        <div className='newbie-heading'>
          <span>For beginner you need to try</span>
          <h3>Explore More Techniques</h3>
        </div>

        <div className='newbie-container'>
          {techniques.map(technique => (
            <div className='noob-box' key={technique._id}>
              <div className='noob-img'>
                <img src={`${process.env.REACT_APP_API}/uploads/${technique.file}`} alt={technique.title} />
              </div>

              <div className='noob-text'>
                <Link to={`/techniques/${technique._id}`} className='noob-title'>{technique.title}</Link>
                <span>
                    <FaBook /> : Article
                    </span>
                <p>{technique.content.substring(0, 150)}...</p> {/* Truncate content for preview */}
                <Link to={`/techniques/${technique._id}`} className='noob-btn'>See more</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Newbietech;
