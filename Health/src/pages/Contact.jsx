import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
       <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT<span className='text-gray-700 font-semibold'>US</span></p>
        </div> 
        <div className=' my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
          <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt=''/>
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-lg text-gray-600'>Our Team</p>
            <p className='text-gray-500'> P.O. Box: 143-10300 <br/>Kerugoya.</p>
            <p className='text-gray-500'>Tel:(0757750349)</p>
            <p className='text-gray-500'>Email:mhealth@gmail.com</p>
            <p className='text-gray-500'>Twitter 𝕏:@mhealth2025</p>
            <p className='text-gray-500'> Facebook : Mhealth254</p>
          </div>
        </div>
    </div>
  )
}

export default Contact