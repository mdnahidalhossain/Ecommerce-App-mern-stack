import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useShopStore } from '../store/ShopStore.js'
import axios from 'axios'

const PlaceOrderPage = () => {

  const navigate = useNavigate()

  const { products, delivery_fee, cartItems, setCartItems, backendUrl, token, getTotalCartAmount } = useShopStore()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const inputName = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [inputName]: value }))

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const orderItems = []

      for (const itemId in cartItems) {
        for (const item in cartItems[itemId]) {
          if (cartItems[itemId][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId))

            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[itemId][item]

              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log(orderItems)

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + delivery_fee
      }

      switch (paymentMethod) {
        case 'cod':
          try {
            const response = await axios.post(`${backendUrl}/order/place-order`, orderData, { headers: { token } })

            if (response.data.success) {
              setCartItems({})
              navigate('/orders')
            } else {
              toast.error(response.data.message)
            }
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
          break;

        case 'stripe':
          try {
            const responseStripe = await axios.post(`${backendUrl}/order/stripe`, orderData, { headers: { token } })

            if (responseStripe.data.success) {
              const {session_url} = responseStripe.data 
              window.location.replace(session_url)
            } else {
              toast.error(responseStripe.data.message)
            }

          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error)
      toast.error("Error! Couldn't place order.", error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col justify-between gap-4 pt-5 min-h-[80vh] border-t sm:flex-row sm:pt-14'>
        {/* left side */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl my-3 sm:text-2xl'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='flex gap-3'>
            <input name='firstName' value={formData.firstName} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' required />
            <input name='lastName' value={formData.lastName} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' required />
          </div>

          <input name='email' value={formData.email} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' required />
          <input name='address' value={formData.address} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Your address' required />

          <div className='flex gap-3'>
            <input name='city' value={formData.city} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' required />
            <input name='state' value={formData.state} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' required />
          </div>

          <div className='flex gap-3'>
            <input name='zipCode' value={formData.zipCode} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip code' required />
            <input name='country' value={formData.country} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' required />
          </div>

          <input name='phone' value={formData.phone} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' required />
        </div>

        {/* right side  */}

        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal />
          </div>

          <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />

            {/* payment methods selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={() => setPaymentMethod('stripe')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
              </div>

              {/* <div onClick={() => setPaymentMethod('razor')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod === 'razor' ? 'bg-green-400' : ''}`}></p>
                <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
              </div> */}

              <div onClick={() => setPaymentMethod('cod')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-600 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>
          </div>

          <div className='flex justify-end pt-8'>
            <button type='submit' /*onClick={() => navigate("/orders")}*/ className='py-3 px-16 bg-black text-white text-xs cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrderPage