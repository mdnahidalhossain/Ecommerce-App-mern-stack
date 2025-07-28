import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl= import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(true)
    const [cartItems, setCartItems] = useState()
    const navigate = useNavigate()
    const [products, setproducts] = useState([])
    const [token, setToken] = useState('')

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, navigate, addToCart, getProductData, backendUrl
    }

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/product/list-product')
            if (response.data.success) {
                    setproducts(response.data.products)
                } else {
                    console.error("API responded with failure:", response.data.message)
                    toast.error(response.data.message)
                }

                console.log(response.data)

        } catch (error) {
            console.log(error)
                toast.error("Error fetching product data!")
        }
    }

    // useEffect(() => {
    //     console.log("All products:")
    //     getProductData()
    // })

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        setCartItems(cartData)

        if (token) {
                try {
                    await axios.post(backendUrl + '/cart/add-cart', {itemId, size}, {headers: {token}})
                } catch (error) {
                    console.log(error)
                }
            }
    }

    useEffect(() => {console.log(cartItems)}, [cartItems])

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider