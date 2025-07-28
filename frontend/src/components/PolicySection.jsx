import React from 'react'
import { assets } from '../assets/assets'

const PolicySection = () => {
    return (
        <>
            <div className='flex flex-col justify-around gap-12 text-xs text-center py-20 sm:flex-row sm:gap-2 sm:text-sm md:text-base text-gray-700'>
                <div>
                    <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
                    <p className='font-semibold'>Easy Exchnage Policy</p>
                    <p className='text-gray-400'>We hassle offer exchange policy</p>
                </div>
                <div>
                    <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
                    <p className='font-semibold'>7 Days Return Policy</p>
                    <p className='text-gray-400'>We provide 7 days free return policy</p>
                </div>
                <div>
                    <img src={assets.support_icon} className='w-12 m-auto mb-5' alt="" />
                    <p className='font-semibold'>Best Customer Support</p>
                    <p className='text-gray-400'>Best Customer Support</p>
                </div>
            </div>
        </>
    )
}

export default PolicySection