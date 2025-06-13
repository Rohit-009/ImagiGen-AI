import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import BuyCredit from './pages/BuyCredit'
import Footer from './components/Footer'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import { AppContext } from './context/AppContext'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  


const App = () => {
  const {showLogin, showForgotPassword} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-100'  >
      <ToastContainer position='bottom-right' />
    <Navbar/>
    {showLogin && <Login/>}
    {showForgotPassword && <ForgotPassword/>}
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
      </Routes>
    <Footer/>
    </div>
  )
}

export default App
