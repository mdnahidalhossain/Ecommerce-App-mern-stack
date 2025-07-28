import React from 'react'
import { useShopStore } from '../store/ShopStore.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const VerifyPage = () => {

    const navigate = useNavigate()
    const { backendUrl, token, setCartItems } = useShopStore()

    //to get the parameters/endpoint of the page directed to after successfull stripe/razor payment
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success') === 'true'
    const orderId = searchParams.get('orderId')

    console.log('Success:', success);
    console.log('Order ID:', orderId);

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(`${backendUrl}/order/verify-stripe`, { success, orderId }, { headers: { token } })

            if (response.data.success) {
                setCartItems({})
                toast.success('Payment verified successfully')
                navigate('/orders')
            } else {
                toast.error('Payment verification failed')
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token, success, orderId]);

    return (
        <>
            <div>
                <h2>Verifying your payment...</h2>
            </div>
        </>
    )
}

export default VerifyPage