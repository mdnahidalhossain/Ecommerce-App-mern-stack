import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
        console.log("MONGO-DB connected successfully!")
    } catch (error) {
        console.log("Error connecting to MONGO-DB", error)
        process.exit(1)
    }
} 