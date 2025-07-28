import React, { useEffect, useState } from 'react'
import { useShopStore } from '../store/ShopStore'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProductSection = ({category, subCategory}) => {

    const {products} = useShopStore()
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let allProducts = products.slice()

            allProducts = allProducts.filter((item) => category === item.category)

            allProducts = allProducts.filter((item) => subCategory === item.subCategory)

            console.log(allProducts.slice(0, 5))

            setRelatedProduct(allProducts.slice(0, 5))
        }
    }, [products])

    return (
        <>
            <div className='my-24'>
                <div className='text-center text-3xl oy-2'>
                    <Title text1={'RELATED'} text2={'PRODUCTS'}/>
                </div>

                <div className='grid grid-cols-2, sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {relatedProduct.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RelatedProductSection