import React, { useEffect, useState } from 'react'
import { useShopStore } from '../store/ShopStore'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSellerSection = () => {
    const [bestSeller, setBestSeller] = useState([])
    const { products, getProductData } = useShopStore()

    useEffect(() => {
        // Fetch products if not already available
        if (!products || products.length === 0) {
            getProductData()
        }
    }, [])

    useEffect(() => {
        if (products && products.length > 0) {
            const bestProduct = products.filter(item => item && item.bestSeller)
            setBestSeller(bestProduct.slice(0, 5))
        }
    }, [products])

    return (
        <>
            <div className='my-10'>
                <div className='text-center py-8 text-3xl'>
                    <Title text1={'BEST'} text2={'SELLER'} />
                    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base texr-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam sint molestiae nemo minima consectetur vel!</p>
                </div>
                {/* Rendering best seller products  */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {bestSeller.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.pName}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BestSellerSection