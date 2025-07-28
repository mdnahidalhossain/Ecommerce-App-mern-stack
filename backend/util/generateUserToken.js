import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const generateToken = (res, userId) => {
    const token = jwt.sign(
        { userId }, process.env.JWT_SECRET, { expiresIn: "1d" })

    return token
}

export const generateAdminToken = (res, adminEmail) => {
    const token = jwt.sign(
        { adminEmail }, process.env.JWT_SECRET, { expiresIn: "1d" }
    )

    return token
}