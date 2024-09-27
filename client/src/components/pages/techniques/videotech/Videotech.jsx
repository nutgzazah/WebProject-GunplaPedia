import React from 'react'
import './Videotech.css'
import Carouseltech from '../carouseltech/Carouseltech'

const Videotech = () => {
  return (
    <div className='vidtech'>
        <h1>4EVE - Hot 2 Hot | Official MV ( Dance Version )</h1>
        <div className='vid-des'>
            <iframe className='players' src="https://www.youtube.com/embed/qGh94oGQziw?si=N_vMeyj9_yX4prHs" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <p><b>Description:</b><span> ma placeat, itaque eum neque officiis unde, 
                eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. 
                Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. 
                Ut, exercitationem eum aperiam illo illum laudantiumx? </span> </p>
        </div>
        <h2>Recommended <span> Video!!</span></h2>
        <Carouseltech />
    </div>
  )
}

export default Videotech
