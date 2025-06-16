// import React, { useState, useContext, useEffect } from 'react';
// import { assets } from '../assets/assets';
// import { AppContext } from '../context/AppContext';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const { backendUrl, setShowLogin, setShowForgotPassword } = useContext(AppContext);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
//                 email,
//                 newPassword
//             });

//             if (data.success) {
//                 toast.success('Password successfully changed!');
//                 setShowForgotPassword(false);
//                 setShowLogin(true);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     useEffect(() => {
//         document.body.style.overflow = 'hidden';
//         return () => {
//             document.body.style.overflow = 'unset';
//         }
//     }, []);

//     return (
//         <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
//             <motion.form
//                 onSubmit={handleSubmit}
//                 initial={{ opacity: 0.2, y: 100 }}
//                 transition={{ duration: 0.8 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className='relative bg-white p-10 rounded-xl text-slate-500'
//             >
//                 <h1 className='text-center text-2xl text-neutral-700 font-medium'>Reset Password</h1>
//                 <p className='text-sm mt-3 text-center'>Enter your email and new password</p>

//                 <div className='border px-6 py-2 flex items-center gap-3 rounded-full mt-6'>
//                     <img src={assets.email_icon} alt="" />
//                     <input
//                         onChange={(e) => setEmail(e.target.value)}
//                         value={email}
//                         type="email"
//                         className='outline-none text-sm w-full'
//                         placeholder='Email address'
//                         required
//                     />
//                 </div>

//                 <div className='border px-6 py-2 flex items-center gap-3 rounded-full mt-3'>
//                     <img src={assets.lock_icon} alt="" />
//                     <input
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         value={newPassword}
//                         type="password"
//                         className='outline-none text-sm w-full'
//                         placeholder='New password'
//                         required
//                     />
//                 </div>

//                 <button className='bg-blue-600 w-full text-white py-2 rounded-full mt-6'>
//                     Reset Password
//                 </button>

//                 <p className='mt-5 text-center'>
//                     Remember your password?{' '}
//                     <span
//                         className='text-blue-600 cursor-pointer'
//                         onClick={() => {
//                             setShowForgotPassword(false);
//                             setShowLogin(true);
//                         }}
//                     >
//                         Login
//                     </span>
//                 </p>
//                 <img 
//                     onClick={() => setShowForgotPassword(false)} 
//                     src={assets.cross_icon} 
//                     alt="" 
//                     className='absolute top-5 right-5 cursor-pointer h-5 w-7 opacity-75'
//                 />
//             </motion.form>
//         </div>
//     );
// };

// export default ForgotPassword;
import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

// Password must include: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
};

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { backendUrl, setShowLogin, setShowForgotPassword } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(newPassword)) {
            setPasswordError(
                `Password must be at least 8 characters
and include uppercase, lowercase, number,
and special character.`
            );

            return;
        } else {
            setPasswordError('');
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
                email,
                newPassword
            });

            if (data.success) {
                toast.success('Password successfully changed!');
                setShowForgotPassword(false);
                setShowLogin(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white p-10 rounded-xl text-slate-500'
            >
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>Reset Password</h1>
                <p className='text-sm mt-3 text-center'>Enter your email and new password</p>

                <div className='border px-6 py-2 flex items-center gap-3 rounded-full mt-6'>
                    <img src={assets.email_icon} alt="" />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className='outline-none text-sm w-full'
                        placeholder='Email address'
                        required
                    />
                </div>

                <div className='border px-6 py-2 flex items-center gap-3 rounded-full mt-3'>
                    <img src={assets.lock_icon} alt="" />
                    <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        type="password"
                        className='outline-none text-sm w-full'
                        placeholder='New password'
                        required
                    />
                </div>
                {passwordError && (
                    <p className='text-red-500 text-xs mt-2 ml-3 mr-3 whitespace-pre-line'>
                        {passwordError}
                    </p>

                )}

                <button className='bg-blue-600 w-full text-white py-2 rounded-full mt-6'>
                    Reset Password
                </button>

                <p className='mt-5 text-center'>
                    Remember your password?{' '}
                    <span
                        className='text-blue-600 cursor-pointer'
                        onClick={() => {
                            setShowForgotPassword(false);
                            setShowLogin(true);
                        }}
                    >
                        Login
                    </span>
                </p>
                <img
                    onClick={() => setShowForgotPassword(false)}
                    src={assets.cross_icon}
                    alt=""
                    className='absolute top-5 right-5 cursor-pointer h-5 w-7 opacity-75'
                />
            </motion.form>
        </div>
    );
};

export default ForgotPassword;
