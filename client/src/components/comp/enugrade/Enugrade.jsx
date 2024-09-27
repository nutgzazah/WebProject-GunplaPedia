import React from 'react'
import './Enugrade.css'
import { FaExternalLinkAlt } from "react-icons/fa";
import Enu1 from '../../../assets/enu1.jpg'
import Enu2 from '../../../assets/enu2.jpg'
import Enu3 from '../../../assets/enu3.jpg'
import Enu4 from '../../../assets/enu4.jpg'
import Enu5 from '../../../assets/enu5.jpg'
import Enu6 from '../../../assets/enu6.jpg'
import Enu7 from '../../../assets/enu7.jpg'
import Enu80 from '../../../assets/enu80.jpg'
import Enu9 from '../../../assets/enu9.jpg'

const Enugrade = () => {
  return (
    <div>
      <section className='enumerate'>
        <h2 className="heading-mean">All grades of <span>Gunpla</span></h2>

        <div className='enumerate-container'>
            <div className='enumerate-box'>
                <img src={Enu1}/>
                <div className='enumerate-layer'>
                    <h4>SD(Super Deformed)</h4>
                    <p>Has a small size and large head Makes it look cute.</p>
                </div>
            </div>

            <div className='enumerate-box'>
                <img src={Enu2}/>
                <div className='enumerate-layer'>
                    <h4>HG(High Grade)</h4>
                    <p>1/144 Scale Suited for beginner and the most popular</p>
                </div>
            </div>

            <div className='enumerate-box'>
                <img src={Enu3}/>
                <div className='enumerate-layer'>
                    <h4>RG(Real Grade)</h4>
                    <p>Details like MG in HG Scale</p>
                </div>
            </div>

            <div className='enumerate-box'>
                <img src={Enu4}/>
                <div className='enumerate-layer'>
                    <h4>MG (Master Grade)</h4>
                    <p>1/100 scale with a flexible joint system and can change poses.</p>
                </div>
            </div>

            <div className='enumerate-box'>
                <img src={Enu5}/>
                <div className='enumerate-layer'>
                    <h4>PG (Perfect Grade)</h4>
                    <p>1/60 scale It is complicated to build and has a lot of details.</p>
                </div>
            </div>

            <div className='enumerate-box'>
                <img src={Enu6}/>
                <div className='enumerate-layer'>
                    <h4>Mega Size Model</h4>
                    <p>1/48 scale Largest size, easy to assemble and not complicated</p>
                </div>
            </div>
            <div className='enumerate-box'>
                <img src={Enu7}/>
                <div className='enumerate-layer'>
                    <h4>Reborn-One Hundred</h4>
                    <p>Scale as MG with no inner frame.</p>
                </div>
            </div>
            <div className='enumerate-box'>
                <img src={Enu80}/>
                <div className='enumerate-layer'>
                    <h4>1/100 Scale</h4>
                    <p>Scale as MG with no inner frame.</p>
                </div>
            </div>
            <div className='enumerate-box'>
                <img src="https://da.lnwfile.com/_/da/_raw/j8/to/xh.jpg"/>
                <div className='enumerate-layer'>
                    <h4>EG (Entry Grade)</h4>
                    <p>The parts can be removed without using cutting tools.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Enugrade
