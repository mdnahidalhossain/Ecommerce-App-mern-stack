import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useShopStore } from '../store/ShopStore'

const NavBar = () => {

    const [showMenuBar, setShowMenuBar] = useState(false)

    const { setShowSearch, getCartCount, userLogout, token } = useShopStore()

    const navigate = useNavigate()

    const location = useLocation();
    const isCollectionPage = location.pathname === '/collection';

    const logoutOnClick = () => {
        navigate('/login')
        userLogout()
        console.log("Logging out...")
    }

    return (
        <>
            <div className='flex items-center justify-between py-5 font-medium'>
                <Link to={"/"}>
                    <img src={assets.logo} className='w-36' alt="" />
                </Link>

                <ul className='hidden sm:flex gap-5 text-sm textgray-700'>
                    <NavLink to={"/"} className='flex flex-col items-center gap-1'>
                        <p>Home</p>
                        <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to={"/collection"} className='flex flex-col items-center gap-1'>
                        <p>Collection</p>
                        <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to={"/about"} className='flex flex-col items-center gap-1'>
                        <p>About</p>
                        <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to={"/contact"} className='flex flex-col items-center gap-1'>
                        <p>Contact</p>
                        <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-6'>
                    {isCollectionPage && (<img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />)}

                    <div className='group relative'>
                        <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />

                        {/* drop-down menu  */}

                        {token && <div className='dropdown-menu hidden absolute group-hover:block right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logoutOnClick} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>}
                    </div>

                    <Link to={"/cart"} className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                        <p className='bg-black w-4 h-4 rounded-full text-center absolute text-white text-[9px] aspect-square right-[-5px] bottom-[-5px] leading-4'>{getCartCount()}</p>
                    </Link>

                    <img onClick={() => setShowMenuBar(true)} src={assets.menu_icon} className='sm:hidden md:hidden w-5 cursor-pointer' alt="" />
                </div>

                {/* menu bar for mobile screens */}

                <div className={`bg-white absolute top-0 right-0 bottom-0 overflow-hidden transition-all ${showMenuBar ? 'w-full' : 'w-0'}`}>
                    <div className='flex justify-end py-6 pr-4'>
                        <img onClick={() => setShowMenuBar(false)} src={assets.cross_icon} className='bg-gray-300 p-2 rounded-full cursor-pointer w-8' alt="" />
                    </div>
                    <div className='flex flex-col text-gray-600'>
                        <NavLink onClick={() => setShowMenuBar(false)} to={"/"} className='py-4 pl-6 border-b border-gray-300 cursor-pointer'>Home</NavLink>
                        <NavLink onClick={() => setShowMenuBar(false)} to={"/collection"} className='py-4 pl-6 border-b border-gray-300 cursor-pointer'>Collection</NavLink>
                        <NavLink onClick={() => setShowMenuBar(false)} to={"/about"} className='py-4 pl-6 border-b border-gray-300 cursor-pointer'>About</NavLink>
                        <NavLink onClick={() => setShowMenuBar(false)} to={"/contact"} className='py-4 pl-6 border-b border-gray-300 cursor-pointer'>Contact</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar