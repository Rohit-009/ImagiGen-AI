//Create ai images 

import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'

const Description = () => {
    return (
        <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28 '
        initial={{ opacity: 0.2, y: 100 }}
transition={{ duration: 1 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
        >
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2 -mt-16 '>Create AI Images</h1>
            <p className='text-gray-600 mb-8 '>Turn your imagination into visuals</p>

            <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center '>
                <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg ' />
                <div>
                    <h2 className='text-3xl font-medium max-w-lg mb-4 '>
                        Introducing The AI-Powered Text to Image Generator
                    </h2>
                    <p className='text-gray-600 mb-4 '>Turn your ideas into stunning visuals 
                        effortlessly with our free AI image g
                        
                        enerator.
                        Just describe what you imagine, and our tool will instantly
                        bring it to life with unique, eye-catching imagery.</p>
                        <p className='text-gray-600  ' >
                        Just type a text prompt, and our advanced 
                        AI will generate high-quality images in seconds. 
                        Whether it's product visuals, character designs, 
                        portraits, or even concepts that don’t exist yet—bring 
                        them to life effortlessly. With powerful AI at your 
                        fingertips, your creative possibilities are limitless!
                        </p>
                </div>
            </div>
        </motion.div>
    )
}

export default Description
