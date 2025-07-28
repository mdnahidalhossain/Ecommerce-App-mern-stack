import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

// dotenv config
dotenv.config()
// App config
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors())

// API endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.listen(port, () => {
    connectDB()
    connectCloudinary()
    console.log("Server is running on port: ", port)
})
