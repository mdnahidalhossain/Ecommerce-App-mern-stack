import PlacedOrder from "../models/PlacedOrder.js"
import User from "../models/User.js"
import Stripe from 'stripe'

const currency = 'usd'
const deliveryCharge = 10

// stripe gateaway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// place order usind COD method
const placeOrder = async (req, res) => {

    const { userId, items, amount, address } = req.body

    try {
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        //placing a new order
        const newOrder = new PlacedOrder(orderData)
        await newOrder.save()

        //after placing the order for a products added in cart
        //clear the cart for the product that has been ordered
        await User.findByIdAndUpdate(userId, { cartData: {} })

        res.status(200).json({
            success: true,
            message: "Order Placed Successfully!",
            newOrder
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// place order usind Stripe method
const placeOrderStripe = async (req, res) => {
    const { userId, items, amount, address } = req.body

    //get the url origin
    const origin = req.get('origin')

    try {
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        //placing a new order
        const newOrder = new PlacedOrder(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.pName,
                },
                unit_amount: item.price * 100

            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharge * 100

            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.status(200).json({
            success: true,
            session_url: session.url
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const verifyStripePayment = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === true) {
            await PlacedOrder.findByIdAndUpdate(orderId, { payment: true })

            // after successful payment, clear the cart items
            await User.findByIdAndUpdate(userId, { cartData: {} })

            res.status(200).json({
                success: true,
            })
        } else {
            await PlacedOrder.findByIdAndDelete(orderId)
            res.status(400).json({
                success: false,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// place order usind Razor Pay method
const placeOrderRazorPay = async (req, res) => {

}

// all orders placed by each user
const userOrders = async (req, res) => {

    const { userId } = req.body

    try {
        const orders = await PlacedOrder.find({ userId })

        res.status(200).json({
            success: true,
            orders
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


// all placed orders data for Admin Panel
const allPlacedOrders = async (req, res) => {
    try {
        const allOrders = await PlacedOrder.find({})

        res.status(200).json({
            success: true,
            allOrders
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


// update order status for Admin Panel
const updateOrderStatus = async (req, res) => {

    const { orderId, status } = req.body

    try {
        await PlacedOrder.findByIdAndUpdate(orderId, { status })

        res.status(200).json({
            success: true,
            message: "Status Updated"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export { placeOrder, placeOrderStripe, placeOrderRazorPay, userOrders, allPlacedOrders, updateOrderStatus, verifyStripePayment }