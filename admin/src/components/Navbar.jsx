import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { CounselorContext } from '../context/CounselorContext'

const Navbar = () => {

    const {aToken,setAtoken} = useContext(AdminContext)
    const {cToken,setCToken} = useContext(CounselorContext)

    const navigate =useNavigate()

    const logout = () =>{
        navigate('/')
        aToken && setAtoken('')
        aToken && localStorage.removeItem('aToken')
        console.log("setCtoken:", setCToken); // Debugging
        cToken && setCToken('')
        cToken && localStorage.removeItem('cToken')
        

    }


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs' >
            <img className="w-36 sm:w-20 cursor-pointer"src={assets.logo} alt=''/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin':'Counselor'}</p>
        </div>
<button onClick={logout} className='bg-blue-400 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar