import express from 'express'
import { adminLogin, userSignup, userLogin, getAllUsers } from '../controllers/UserController.js'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.post('/signup', userSignup)
userRouter.post('/login', userLogin)
userRouter.post('/admin', adminLogin)

export default userRouter