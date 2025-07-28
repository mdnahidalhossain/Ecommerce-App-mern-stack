import express from 'express'
import { addToUserCart, getUserCart, updateUserCart } from '../controllers/cartController.js'
import userAuth from '../middleware/userAuth.js'

const cartRouter = express.Router()

cartRouter.post('/add-cart',userAuth, addToUserCart)
cartRouter.post('/update-cart',userAuth, updateUserCart)
cartRouter.post('/get-cart',userAuth, getUserCart)

export default cartRouter