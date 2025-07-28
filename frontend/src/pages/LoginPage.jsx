import React, { useEffect, useState } from 'react'
import { useShopStore } from '../store/ShopStore'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { userSignup, userLogin, token, getUserCart } = useShopStore()
  const navigate = useNavigate()
  const [userName, setUserName,] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleSubmt = async (e) => {
    e.preventDefault()

    if (currentState === 'Sign Up') {
      await userSignup(userName, userEmail, userPassword)

    } else {
      await userLogin(userEmail, userPassword)
    }
  }


  useEffect(() => {

    if (token) {
      navigate('/')
      getUserCart(token)
    }

  }, [token, navigate])


  return (
    <>
      <form onSubmit={handleSubmt} className='flex flex-col items-center w-[90%] m-auto mt-14 gap-4 text-gray-800 sm:max-w-96'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='noto-serif text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {currentState === 'Login'
          ? ''
          : <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder='Enter name' className='w-full px-3 py-2 border border-gray-800' required />}

        <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" placeholder='Enter email' className='w-full px-3 py-2 border border-gray-800' required />

        <input value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type="password" placeholder='Enter password' className='w-full px-3 py-2 border border-gray-800' required />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
          {currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-blue-500'>Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-blue-500'>Login</p>
          }
        </div>
        <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign up'}</button>
      </form>
    </>
  )
}

export default LoginPage