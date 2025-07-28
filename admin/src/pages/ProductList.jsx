import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backend_url, currency } from '../App'
import toast from 'react-hot-toast'

const ProductList = ({ token }) => {

  const [productList, setProductList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backend_url + '/product/list-product')

      if (response.data.success) {
        setProductList(response.data.products)
      } else {
        toast.error("Error! Could not fectch all products.")
      }

      console.log(response.data)

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backend_url + '/product/remove-product', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success("Product removed successfully!")

        // after removing a productList, the product list must be refreshed/updated
        await fetchList()
      } else {
        toast.error("Error!s Could not remove product.")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Listing all products from the database/api */}

        {
          productList.map((item, index) => (
            <div key={index} className='grid grid-cols[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm'>
              <img src={item.image?.[0]} className='w-12' alt="" />
              <p>{item.pName}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center text-lg cursor-pointer'>x</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ProductList