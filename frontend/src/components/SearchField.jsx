import React, { useEffect, useState } from 'react'
import { useShopStore } from '../store/ShopStore'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchField = () => {

    const { search, setSearch, showSearch, setShowSearch } = useShopStore()
    const location = useLocation();
    const [visible, setVisible] = useState()

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }

    }, [location])

    //if showSearch is true then the search field will appear
    return showSearch && visible ? (
        <>
            <div className='border-t border-b bg-gray-50 text-center'>
                <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search'/>
                    <img src={assets.search_icon} className='w-4' alt="" />
                </div>
                <img onClick={() => setShowSearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer' alt="" />
            </div>
        </>
    ) : null
}

export default SearchField