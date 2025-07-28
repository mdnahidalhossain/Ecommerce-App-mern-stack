import React from 'react'
import { assets } from '../assets/assets'

const FooterSection = () => {
    return (
        <>
            <div>
                <div className='flex flex-col gap-14 my-10 mt-40 text-sm sm:grid grid-cols-[3fr_1fr_1fr]'>
                    <div className=''>
                        <img src={assets.logo} className='mb-5 w-32' alt="" />
                        <p className='w-full text-gray-600 md:w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quae delectus voluptates cupiditate, soluta nemo. Placeat possimus nobis suscipit consectetur quasi amet, voluptate nulla odit! Vel cumque accusamus animi vitae.</p>
                    </div>

                    <div>
                        <p className='text-xl font-medium mb-5'>COMPANY</p>
                        <ul className='flex flex-col gap-1 text-gray-600'>
                            <li>Home</li>
                            <li>About</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                        <ul className='flex flex-col gap-1 text-gray-600'>
                            <li>+1-212-456-7890</li>
                            <li>companymail@email.com</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <hr />
                    <p className='py-5 text-sm text-center'>Copyright 2024 © forever.com - All Right Reserved.</p>
                </div>
            </div>
        </>
    )
}

export default FooterSection