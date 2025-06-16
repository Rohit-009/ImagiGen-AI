

// not in  use 
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}

const validatePassword = (password) => {
    return password.length >= 8
}

const ResetPassword = () => {
    const { setShowForgotPassword, backendUrl } = useContext(AppContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [errors, setErrors] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    })

    const validateForm = () => {
        const newErrors = {
            email: '',
            newPassword: '',
            confirmPassword: ''
        }
        let isValid = true

        if (!email.trim()) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format'
            isValid = false
        }

        if (!newPassword) {
            newErrors.newPassword = 'New password is required'
            isValid = false
        } else if (!validatePassword(newPassword)) {
            newErrors.newPassword = 'Password must be at least 8 characters'
            isValid = false
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
                email,
                newPassword
            })
            
            if (data.success) {
                toast.success('Password successfully updated')
                setShowForgotPassword(false)
                navigate('/login')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <motion.form
                onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white p-10 rounded-xl text-slate-500'
            >
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>Reset Password</h1>
                <p className='text-sm mt-3'>Enter your email and new password</p>

                <div className='flex flex-col gap-1'>
                    <div className={`border px-6 py-2 flex items-center gap-3 rounded-full mt-3 ${errors.email ? 'border-red-500' : email && validateEmail(email) ? 'border-green-500' : ''}`}>
                        <img src={assets.email_icon} alt="" />
                        <input 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            type="email" 
                            className='outline-none text-sm w-full' 
                            placeholder='Email id' 
                        />
                    </div>
                    {errors.email && <span className='text-red-500 text-xs pl-6'>{errors.email}</span>}
                </div>

                <div className='flex flex-col gap-1'>
                    <div className={`border px-6 py-2 flex items-center gap-3 rounded-full mt-3 ${errors.newPassword ? 'border-red-500' : newPassword && validatePassword(newPassword) ? 'border-green-500' : ''}`}>
                        <img src={assets.lock_icon} alt="" />
                        <input 
                            onChange={e => setNewPassword(e.target.value)} 
                            value={newPassword} 
                            type={showNewPassword ? 'text' : 'password'} 
                            className='outline-none text-sm w-full' 
                            placeholder='New Password' 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)} 
                            className="focus:outline-none"
                        >
                            {showNewPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {errors.newPassword && <span className='text-red-500 text-xs pl-6'>{errors.newPassword}</span>}
                </div>

                <div className='flex flex-col gap-1'>
                    <div className={`border px-6 py-2 flex items-center gap-3 rounded-full mt-3 ${errors.confirmPassword ? 'border-red-500' : confirmPassword && newPassword === confirmPassword ? 'border-green-500' : ''}`}>
                        <img src={assets.lock_icon} alt="" />
                        <input 
                            onChange={e => setConfirmPassword(e.target.value)} 
                            value={confirmPassword} 
                            type={showConfirmPassword ? 'text' : 'password'} 
                            className='outline-none text-sm w-full' 
                            placeholder='Confirm Password' 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                            className="focus:outline-none"
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className='text-red-500 text-xs pl-6'>{errors.confirmPassword}</span>}
                </div>

                <button className='bg-blue-600 w-full text-white py-2 rounded-full mt-6'>
                    Reset Password
                </button>

                <p className='mt-8 text-center'>Remember your password? <span className='text-blue-600 cursor-pointer' onClick={() => setShowForgotPassword(false)}>Login</span></p>

                <img onClick={() => setShowForgotPassword(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer h-5 w-7 opacity-75' />
            </motion.form>
        </div>
    )
}

export default ResetPassword
