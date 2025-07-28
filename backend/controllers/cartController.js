import User from "../models/User.js"


// add products to user cart
const addToUserCart = async (req, res) => {
    const { userId, itemId, size } = req.body

    try {
        const userData = await User.findById(userId)

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        let cartData = await userData.cartData

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

        await User.findByIdAndUpdate(userId, { cartData })

        res.status(200).json({
            success: true,
            message: "Product Added to Cart!"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// update products for user cart
const updateUserCart = async (req, res) => {
    const { userId, itemId, size, quantity } = req.body

    try {
        const userData = await User.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await User.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({
            success: true,
            message: "Cart Updated!"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get user cart data
const getUserCart = async (req, res) => {
    const { userId } = req.body

    try {
        const userData = await User.findById(userId)

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const cartData = userData.cartData

        res.status(200).json({
            success: true,
            cartData
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export { addToUserCart, updateUserCart, getUserCart }