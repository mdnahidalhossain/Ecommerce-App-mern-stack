import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import OrderedProducts from './pages/OrderedProducts'
import Navbar from './component/Navbar'
import ProductList from './pages/ProductList'
import Sidebar from './component/Sidebar'
import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'

export const backend_url = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  //as long as the token is available in the local storage, admin will stay logged in
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <>
      <div className='bg-gray-50 min-h-screen'>
        {token === ''
          ? <LoginPage setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />

              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add-product' element={<AddProduct token={token} />} />
                  <Route path='/product-list' element={<ProductList token={token} />} />
                  <Route path='/orders' element={<OrderedProducts token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        }

      </div>
    </>
  )
}

export default App
