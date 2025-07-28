import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backend_url, currency } from '../App'
import { toast } from 'react-hot-toast'
import { assets } from '../assets/assets'

const OrderedProducts = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null
    }

    try {
      const response = await axios.post(`${backend_url}/order/order-list`, {}, { headers: { token } })

      if (response.data.success) {
        setOrders(response.data.allOrders.reverse())
      } else {
        toast.error(response.data.message)
      }
      console.log(response.data)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  //updating the user order status through admin panel
  const handleProductStatus = async (e, orderId) => {
    try {
      const response = await axios.post(`${backend_url}/order/order-status`, { orderId, status: e.target.value }, { headers: { token } })

      if (response.data.success) {
        await fetchAllOrders()
        console.log(response.data)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <>
      <div>
        <h3>Order Page</h3>
        <div>
          {orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p className='p-0.5' key={index}>{item.pName} x {item.quantity} <span>{item.size}</span>
                        </p>
                      )
                    } else {
                      return (
                        <p className='p-0.5' key={index}>{item.pName} x {item.quantity} <span>{item.size}</span> ,
                        </p>
                      )
                    }
                  })}
                </div>

                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>

                <div>
                  <p>{order.address.address + ", "}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Payment Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toDateString()}</p>
              </div>

              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select value={order.status} onChange={(e) => {handleProductStatus(e, order._id), console.log('Order Id: ', order._id)}} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderedProducts