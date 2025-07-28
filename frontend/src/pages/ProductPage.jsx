import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useShopStore } from '../store/ShopStore'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import RelatedProductSection from '../components/RelatedProductSection'

const ProductPage = () => {

  const { productId } = useParams()
  const { products, currency, addToCart, cartItems } = useShopStore()
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const fetchProductData = async () => {
    try {
      products.map((item) => {
        if (item._id === productId) {
          setProductData(item)
          setImage(item.image[0])

          console.log(item)
          return null
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { console.log("Product added to cart: ", cartItems) }, [cartItems])

  useEffect(() => {

    fetchProductData()

  }, [productId])

  useEffect(() => {
    console.log("Zustand token:", useShopStore.getState().token)
  }, [])


  return productData ? (
    <>
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        <div className='flex gap-12 flex-col sm:flex-row sm:gap-12'>
          <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex justify-between w-full overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%]'>
              {
                productData.image.map((item, index) => (
                  <img onClick={() => setImage(item)} src={item} key={index} className='w-[24] flex-shrink-0 cursor-pointer sm:w-full sm:mb-3' alt="" />
                ))
              }
            </div>
            <div className='w-full sm:w-[79%]'>
              <img src={image} className='w-full h-auto' alt="" />
            </div>
          </div>

          {/* product info */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.pName}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} className='w-3.5' alt="" />
              <img src={assets.star_icon} className='w-3.5' alt="" />
              <img src={assets.star_icon} className='w-3.5' alt="" />
              <img src={assets.star_icon} className='w-3.5' alt="" />
              <img src={assets.star_dull_icon} className='w-3.5' alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index) => (
                  <button onClick={() => setSelectedSize(item)} key={index} className={`border border-gray-200 py-2 px-4 bg-gray-100 ${item === selectedSize ? 'border-orange-500 border-2' : ''}`}>{item}</button>
                ))}
              </div>
            </div>

            <button onClick={() => { addToCart(productData._id, selectedSize) }} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5' />

            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>

        {/* description and reviview section */}
        <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
          </div>
        </div>

        {/* Related product section */}
        <RelatedProductSection category={productData.category} subCategory={productData.subCategory} />
      </div>
    </>
  ) : <div className='opacity-0'></div>
}

export default ProductPage