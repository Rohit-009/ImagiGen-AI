// main page
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Headder = () => {
    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();
  
    const onClickHandler = () => {
      if (user) {
        navigate('/result');
      } else {
        setShowLogin(true);
      }
    }
 
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-1'
     initial={{opacity:0.1,y:150}}
      transition={{duration:1.5}} 
      whileInView={{opacity:1, y:0}} 
      viewport={{once:true}}
     >
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border'
      initial={{opacity:0,y:-20}}
       animate={{opacity:1, y:0}}
       transition={{delay:0.2 ,duration:0.8}} 

      >
        <img src={assets.star_icon} alt="" />
        <p>Best text-to-image generator
        for its unmatched creativity</p>
      </motion.div>
    <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center '
      initial={{opacity:0}}
      animate={{opacity:1}}
      translate={{delay:0.5, duration:2.5}}
    >Convert text to <span className='text-blue-600'>image</span>, in seconds.</motion.h1>
    <motion.p className='text-center max-w-xl mx-auto mt-5 text-lg'
    initial={{opacity:0,y:20}}
    animate={{opacity:1, y:0}}
    translate={{delay:0.6, duration:1}}
    >Where imagination meets creation—turn your words into visuals that speak louder than words.
    Let AI transform your thoughts into breathtaking imagery. </motion.p>
    <motion.button onClick={onClickHandler} className='sm:text-lg  text-white bg-gray-900 w-auto mt-8 mx-10 py-3  px-11 flex   items-center gap-3 rounded-full'
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ default: { duration: 0.5 }, opacity: { delay: 0.9, duration: 1 } }}
    >
        Generate images 
        <img className='h-10 '  src={assets.star_group} alt="" />
    </motion.button>


    <motion.div className='flex flex-wrap justify-center mt-16 gap-3  '
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 1 }}
    >
        {Array(6).fill('').map((item,index)=>( 
         <motion.img className='rounded w-[170px] h-auto hover:scale-105 transition-all duration-300 cursor-pointer'
         whileHover={{ scale: 1.05, duration: 0.1 }}
          src={index%2==0?assets.sample_img_2 : assets.sample_img_1} 
          alt="" key={index} width={70}  />
        ))}
    </motion.div> 
    <motion.p className='mt-2 text-neutral-600'initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 1.2, duration: 0.8 }}
    >Generated images from ImagiGen-AI</motion.p>
    </motion.div>


  )
}

export default Headder
