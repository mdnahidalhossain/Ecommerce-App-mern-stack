import React, { useEffect, useState } from 'react'
import { useShopStore } from '../store/ShopStore'
import Title from '../components/Title'
import axios from 'axios'

const OrderPage = () => {

  const { currency, backendUrl, token } = useShopStore()
  const [userOrders, setUserOrders] = useState([])

  const fetchUserOrders = async () => {
    try {
      if (!token) {
        return null
      } else {
        const response = await axios.post(`${backendUrl}/order/orders`, {}, { headers: { token } })

        if (response.data.success) {
          const allUserOrders = []
          response.data.orders.map((order) => {
            order.items.map((item) => {
              item['status'] = order.status
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['date'] = order.date

              allUserOrders.push(item)
            })
          })
          console.log("All User Orders: ", allUserOrders)
          setUserOrders(allUserOrders.reverse())
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserOrders()
  }, [token])


  return (
    <>
      <div className='border-t pt-16'>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>

        <div className=''>
          {userOrders.map((item, index) => (
            <div key={index} className='py-4 border-t text-gray-700 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.pName}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p className='text-lg'>{currency} {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className='flex justify-between md:w-1/2'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p>{item.status}</p>
                </div>
                <button onClick={fetchUserOrders} className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderPage