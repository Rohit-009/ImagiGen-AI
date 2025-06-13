import React, { useContext, useEffect, useState } from 'react'
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

const Login = () => {
    const [state, setState] = useState('Login')
    const { setShowLogin, setShowForgotPassword, backendUrl, setToken, setUser } = useContext(AppContext)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')  
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
  
    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
        let isValid = true

        if (state === 'Sign Up' && !name.trim()) {
            newErrors.name = 'Name is required'
            isValid = false
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format'
            isValid = false
        }

        if (!password) {
            newErrors.password = 'Password is required'
            isValid = false
        } else if (state === 'Sign Up' && !validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters'
            isValid = false
        }

        if (state === 'Sign Up' && password !== confirmPassword) {
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
            if (state === 'Login') {
                const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                    toast.success('Logged in successfully')
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                    toast.success('Account created successfully')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white p-10 rounded-xl text-slate-500 '>
                <h1 className='text-center text-2xl text-neutral-700 font-medium '>{state}</h1>
                <p className=' text-sm mt-3'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && (
                    <div className='flex flex-col gap-1'>
                        <div className={`border px-4 py-1 flex items-center gap-1 rounded-full mt-4 ${errors.name ? 'border-red-500' : name ? 'border-green-500' : ''}`}>
                            <img src={assets.profile_icon} className="w-7 h-7 opacity-50" alt="" />
                            <input 
                                onChange={e => setName(e.target.value)} 
                                value={name} 
                                type="text" 
                                className='outline-none text-sm w-full' 
                                placeholder='Full Name' 
                            />
                        </div>
                        {errors.name && <span className='text-red-500 text-xs pl-4'>{errors.name}</span>}
                    </div>
                )}
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
                    <div className={`border px-6 py-2 flex items-center gap-3 rounded-full mt-3 ${errors.password ? 'border-red-500' : password && (state === 'Login' || validatePassword(password)) ? 'border-green-500' : ''}`}>
                        <img src={assets.lock_icon} alt="" />
                        <input 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} 
                            type={showPassword ? 'text' : 'password'} 
                            className='outline-none text-sm w-full' 
                            placeholder='Password' 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} 
                            className="focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {errors.password && <span className='text-red-500 text-xs pl-6'>{errors.password}</span>}
                </div>

                {state === 'Sign Up' && (
                    <div className='flex flex-col gap-1'>
                        <div className={`border px-6 py-2 flex items-center gap-3 rounded-full mt-3 ${errors.confirmPassword ? 'border-red-500' : confirmPassword && password === confirmPassword ? 'border-green-500' : ''}`}>
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
                )}

                {state === 'Login' && (
                    <p onClick={() => {
                        setShowLogin(false);
                        setShowForgotPassword(true);
                    }} className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
                )}

                <button className='bg-blue-600 w-full text-white py-2 rounded-full mt-6'>
                    {state === 'Login' ? 'login' : 'create account'}
                </button>

                {state === 'Login' ? (
                    <p className='mt-8 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
                ) : (
                    <p className='mt-8 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>
                )}

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className=' absolute top-5 right-5 cursor-pointer h-5 w-7 opacity-75 ' />
            </motion.form>
        </div>
    )
}

export default Login