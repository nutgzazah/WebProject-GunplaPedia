import React from 'react'
import './Acside.css'
import { FaRobot } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

const Acside = () => {
  return (
    <div className='sidebars_body'>
        <div className='sidebars'>
            <div className='logo_contents'>
                <div className='logo_side'>
                    <FaRobot />
                    <div className='side_name'>GunplaPedia</div>
                </div>
                <IoMdMenu id='btnside'/>
            </div>
            <ul className='side_list'>
                <li>
                    <a href='#'>
                        <MdAccountCircle />
                        <span className='side_name'>Account</span>                    
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <BsCollectionFill />
                        <span className='side_name'>My collection</span>                    
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <FaHeart />
                        <span className='side_name'>Wishlist</span>                    
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <FaExchangeAlt />
                        <span className='side_name'>Change password</span>                    
                    </a>
                </li>
            </ul>
            <div className='profile_side'>
                <div className='profile'>
                    <div className='side_details'>
                        <div className='name_job'>
                            <div className='sname'>Gemmo Boi</div>
                            <div className='job'>Builder</div>
                        </div>
                    </div>
                    <RiLogoutBoxLine />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Acside
