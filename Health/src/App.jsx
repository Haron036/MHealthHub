import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Counselors from './pages/Counselors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className='mx-4 sm:max-[10%]'>
        <ToastContainer position="top-right" autoClose={3000} />
      <Navbar/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/counselors'element={<Counselors/>}/>
        <Route path='/counselors/:speciality'element={<Counselors/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/about'element={<About/>}/>
        <Route path='/contact'element={<Contact/>}/>
        <Route path='/my-profile'element={<MyProfile/>}/>
        <Route path='/my-appointments'element={<MyAppointments/>}/>
        <Route path='/appointment/:counselorId'element={<Appointment/>}/>

      </Routes>
      <Footer/>

    </div>
  )
}

export default App