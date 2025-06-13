 //last
 import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-center gap-4  mt-9'>
      <img src={assets.logo} alt=""  width={123}/>
      <p className='flex-1 border-l border-gray-400 pl-4 text-lg text-gray-600 max-sm:hidden '>
         All right reserved. Copyright @ImagiGen AI

      </p>
      <div className='flex gap-4 '>
        <img src={assets.facebook_icon} alt="" width={40} />
        <img src={assets.twitter_icon} alt="" width={40} />
        <img src={assets.instagram_icon} alt="" width={40} />
      </div>
    </div>
  )
}

export default Footer
