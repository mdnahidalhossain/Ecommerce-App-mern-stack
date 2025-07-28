import React, { useState } from 'react'
import axios from 'axios'
import { backend_url } from '../App'
import toast from 'react-hot-toast'

const LoginPage = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(backend_url + '/user/admin', {email, password})

            if (response.data.success) {
                setToken(response.data.token)

            } else {
                toast.error('Login failed!')
            }
            console.log(response)

        } catch (error) {
            console.log(error)
            toast.error("Invalid credentials!")
        }
    }
    return (
        <>
            <div className='min-h-screen flex justify-center items-center w-full'>
                <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                    <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

                    <form onSubmit={handleSubmit} >
                        <div className='mb-3 min-w-72'>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
                        </div>
                        <div className='mb-3 min-w-72'>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter password' required />
                        </div>
                        <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer' type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage