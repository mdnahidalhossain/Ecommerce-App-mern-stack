import { create } from 'zustand'
// import { products } from '../assets/assets.js'
import toast from 'react-hot-toast'
import axios from 'axios'
// best way for dynamic/global state management
export const useShopStore = create((set, get) => (
    {
        // products: products,
        products: [],
        currency: "$",
        delivery_fee: 10,
        search: '',
        showSearch: false,
        cartItems: {},
        setCartItems: (value) => {set({cartItems: value})},
        backendUrl: import.meta.env.VITE_BACKEND_URL,
        token: '',


        // Add this new action:
        initializeStore: async () => {
            const token = localStorage.getItem('token');
            if (token) {
                set({ token });
                await get().getUserCart(token); // Fetch cart data immediately
            }
        },

        // setToken: (token) => set({ token }),

        userSignup: async (name, email, password) => {
            const backendUrl = get().backendUrl

            try {
                const response = await axios.post(backendUrl + '/user/signup', { name, email, password })

                if (response.data.success) {
                    set({ token: response.data.token })
                    //the user token will be saved at user's local storage
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message)
                }

                console.log(response.data)

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        },

        userLogin: async (email, password) => {
            const backendUrl = get().backendUrl

            try {
                const response = await axios.post(backendUrl + '/user/login', { email, password })

                if (response.data.success) {

                    set({ token: response.data.token })
                    //the user token will be saved at user's local storage
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message)
                }

                console.log(response.data)

            } catch (error) {
                console.log(error)
                toast.error("Invalid Credentials!")
            }
        },

        userLogout: () => {
            localStorage.removeItem('token')

            set({ token: '', cartItems: {} })

            toast.success("Logged out successfully");
        },

        getProductData: async () => {

            const backendUrl = get().backendUrl
            // const products = get().allProducts

            if (!backendUrl) {
                console.error("Missing backend URL");
                return;
            }

            try {
                const response = await axios.get(backendUrl + '/product/list-product')

                if (response.data.success) {
                    set({ products: response.data.products })
                } else {
                    console.error("API responded with failure:", response.data.message)
                    toast.error(response.data.message)
                }
                console.log(response.data)

            } catch (error) {
                console.log(error)
                toast.error("Error fetching product data!")
            }
        },

        setSearch: (value) => {
            set({ search: value })
        },

        setShowSearch: (value) => {
            set({ showSearch: value })
        },

        // setCartItems: (items) => {
        //     set({ cartItems: items })
        // },

        addToCart: async (itemId, size) => {

            const backendUrl = get().backendUrl
            const token = get().token

            if (!size) {
                toast.error("Product size missing!")

                return
            }

            const currentCartData = structuredClone(get().cartItems || {})

            // check for the item id
            if (currentCartData[itemId]) {
                // check if the current item is added to cart more that once
                if (currentCartData[itemId][size]) {
                    currentCartData[itemId][size] += 1
                } else {
                    currentCartData[itemId][size] = 1
                }
            } else {
                currentCartData[itemId] = { [size]: 1 }
            }

            set({ cartItems: currentCartData })

            if (token) {
                try {
                    await axios.post(backendUrl + '/cart/add-cart', { itemId, size }, { headers: { token } })
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        },

        // getCartCount: () => {
        //     let totalCount = 0

        //     const cartItems = get().cartItems || {}

        //     for (const items in cartItems) {
        //         for (const item in cartItems[items]) {
        //             try {
        //                 if (cartItems[items][item] > 0) {
        //                     totalCount += cartItems[items][item]
        //                 }
        //             } catch (error) {
        //                 console.log(error)
        //             }
        //         }
        //     }

        //     return totalCount
        // },

        getCartCount: () => {
            const cartItems = get().cartItems || {};
            let totalCount = 0;

            for (const userId in cartItems) {
                const items = cartItems[userId];
                for (const itemId in items) {
                    const quantity = items[itemId];
                    if (quantity > 0) {
                        totalCount += quantity;
                    }
                }
            }

            return totalCount;
        },


        updateCartItems: async (itemId, size, quantity) => {

            const backendUrl = get().backendUrl
            const token = get().token

            const getCartItem = structuredClone(get().cartItems || {})

            if (!getCartItem[itemId]) {
                getCartItem[itemId] = {};
            }

            getCartItem[itemId][size] = quantity

            set({ cartItems: getCartItem })

            if (token) {
                try {
                    await axios.post(`${backendUrl}/cart/update-cart`, { itemId, size, quantity }, { headers: { token } })

                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        },

        getUserCart: async (token) => {
            const backendUrl = get().backendUrl

            try {
                const response = await axios.post(`${backendUrl}/cart/get-cart`, {}, { headers: { token } })

                set({ cartItems: response.data.cartData })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        },

        getTotalCartAmount: () => {
            let totalAmount = 0
            const cartItems = get().cartItems || {}
            const products = get().products || []

            for (const productId in cartItems) {
                const itemInfo = products.find(product => product._id === productId)

                if (!itemInfo) continue // Skip if product not found

                for (const item in cartItems[productId]) {
                    try {
                        const quantity = cartItems[productId][item]
                        if (quantity > 0) {
                            totalAmount += itemInfo.price * quantity
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }

            return totalAmount
        }

    }
))