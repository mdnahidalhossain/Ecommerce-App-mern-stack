import React, { useEffect, useState } from 'react'
import { useShopStore } from '../store/ShopStore'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {

  const { products, currency, cartItems, updateCartItems, } = useShopStore()
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }

      setCartData(tempData)
      console.log(tempData)
    }

    console.log('All products: ', products)
  }, [cartItems, products])

  // useEffect(() => {
  //   console.log('products:', products)
  // }, [products])
  return (
    <>
      <div className='border-t pt-14'>
        <div className='text-2xl mb-3'>
          <Title text1={'YOUR'} text2={'CART'} />
        </div>

        <div className=''>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)

            return (
              <div key={index} className='py-4 border-b border-b-gray-300 text-gray-700 items-center gap-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]'>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />

                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.pName}</p>

                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency} {productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border border-gray-200 bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateCartItems(item._id, item.size, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border px-1 py-1 max-w-10 sm:max-w-20 sm:px-2' />

                <img onClick={() => updateCartItems(item._id, item.size, 0)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' alt="" />
              </div>

            )
          })}
        </div>
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='flex justify-end pt-8'>
              <button onClick={() => navigate("/place-order")} className='py-3 px-5 bg-black text-white text-xs cursor-pointer'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage