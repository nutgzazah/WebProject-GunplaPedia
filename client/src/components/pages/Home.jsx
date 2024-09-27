import React from 'react'
import Sd from '../comp/grade/sd/Sd'
import Background from '../comp/background/Background'
import Enugrade from '../comp/enugrade/Enugrade'
import Services from '../comp/services/Services'
import Homesearch from '../comp/homesearch/Homesearch'
// import Background from '../../components/Background/Backgrounds'



const Home = () => {
  return (
    <div>
      <Sd />
      <Background />
      <Enugrade />
      <Services />
      <Homesearch />
    </div>
  )
}
export default Home
