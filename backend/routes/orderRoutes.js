import express from 'express'
import { allPlacedOrders, placeOrder, placeOrderRazorPay, placeOrderStripe, updateOrderStatus, userOrders, verifyStripePayment } from '../controllers/placedOrderController.js'
import { adminAuth } from '../middleware/adminAuth.js'
import userAuth from '../middleware/userAuth.js'

const orderRouter = express.Router()

// user payment features
orderRouter.post('/place-order', userAuth, placeOrder)
orderRouter.post('/stripe', userAuth, placeOrderStripe)
orderRouter.post('/razorpay', userAuth, placeOrderRazorPay)
orderRouter.post('/orders', userAuth, userOrders)

//verify Stripe payment
orderRouter.post('/verify-stripe', userAuth, verifyStripePayment)

// admin features
orderRouter.post('/order-list', adminAuth, allPlacedOrders)
orderRouter.post('/order-status', adminAuth, updateOrderStatus)

export default orderRouter  