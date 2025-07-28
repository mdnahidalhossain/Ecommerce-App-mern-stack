import React, { useEffect } from 'react'
import { useShopStore } from '../store/ShopStore'
import { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const CollectionPage = () => {

  const { products, search, showSearch } = useShopStore()
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let filteredProducts = products.slice()

    if (category.length > 0) {
     filteredProducts =filteredProducts.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      filteredProducts =filteredProducts.filter(item => subCategory.includes(item.subCategory))
    }

    // condition for user searches
    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilterProducts(filteredProducts)
  }


  // sorting/filtering products based on prices
  const sortProduct = () => {
    const filteredProducts = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filteredProducts.sort((a, b) => (a.price - b.price)))
        break;

      case 'high-low':
        setFilterProducts(filteredProducts.sort((a, b) => (b.price - a.price)))
        break;
    
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    // console.log(category)
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])


  return (
    <>
      <div className='flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10'>
        {/* filter options */}
        <div className='min-w-60'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
            FILTERS
            <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
          </p>

          {/* Category filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Men'} checked={category.includes('Men')} onChange={toggleCategory} /> Men
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Women'} checked={category.includes('Women')} onChange={toggleCategory} /> Women
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Kids'} checked={category.includes('Kids')} onChange={toggleCategory} /> Kids
              </p>
            </div>
          </div>

          {/* Type/sub-category filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter ? "" : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
              </p>
            </div>
          </div>
        </div>

        {/* Contents for the right side */}
        <div className='flex-1'>
          <div className='flex justify-between text-base mb-4 sm:text-2xl'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />

            {/* product sorting drop-down menu */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Map products based on filters */}
          <div className='grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4'>
            {filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.pName} price={item.price} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionPage