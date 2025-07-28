import React, { useEffect, useState } from 'react'
import { useShopStore } from '../store/ShopStore.js'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx'

const LatestCollectionSections = () => {

    const { products } = useShopStore()
    const [latestProducts, setLatestProducts] = useState([])

    // console.log(products)

    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])


    return (
        <>
            <div className='my-10'>
                <div className='text-center py-8 text-3xl'>
                    <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
                    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base texr-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam sint molestiae nemo minima consectetur vel!</p>
                </div>
                {/* Rendering products  */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.pName} price={item.price} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default LatestCollectionSections