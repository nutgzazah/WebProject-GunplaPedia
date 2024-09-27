import React from 'react'
import { Tilt } from 'react-tilt'
import './Homeadmin.css'

const defaultOptions = {
	reverse:        false,  
	max:            35,     
	perspective:    1000,   
	scale:          1.1,    
	speed:          1000,   
	transition:     true,   
	axis:           null,   
	reset:          true,    
	easing:         "cubic-bezier(.03,.98,.52,.99)",    
}

const HomePageAdmin = () => {
  return (
    <div className="homepage-admin">
      <div className="homeadmin-text" style={{marginLeft: '850px'}}>
        <h1><span className="highlight">W</span>elcome</h1>
        <h1><span className="highlight">A</span>dmin</h1>
      </div>
      <div className="homepage-admin-pic">
        <Tilt options={defaultOptions} style={{ height: 250, width: 250 }}>
          <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e6433717-1468-47d3-a298-0f6b3c244de9/dg2gova-803977e7-c03d-4e24-b6d2-52c2e16dfe2e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U2NDMzNzE3LTE0NjgtNDdkMy1hMjk4LTBmNmIzYzI0NGRlOVwvZGcyZ292YS04MDM5NzdlNy1jMDNkLTRlMjQtYjZkMi01MmMyZTE2ZGZlMmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qDtpPblk09_jnd2ZCRDUF8i8oPtYpxWUKNCbEz69LUE'></img>
        </Tilt>
      </div>
    </div>
  )
}

export default HomePageAdmin
