import React from 'react'
import Headder from '../components/Headder'
import Steps from '../components/Steps'
import Description from '../components/Description'
// import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <div>
      <Headder/>
      <Steps/>
      <Description/> 
      {/* <Testimonials/> */}
      <GenerateBtn/>
      
    </div>
  )
}

export default Home
