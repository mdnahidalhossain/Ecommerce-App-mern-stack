import User from "../models/User.js"
import validator from "validator"
import bcrypt from "bcrypt"
import { generateAdminToken, generateToken } from "../util/generateUserToken.js"

export async function getAllUsers(_, res) {
    //sending successful status fetching status to the database
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        console.error("Error in 'getAllUsers' controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const userSignup = async (req, res) => {

    const { name, email, password } = req.body

    try {

        if (!email || !password || !name) {
            throw new Error("All fields are required!")
        }

        // checking for existing user
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please enter strong password"
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        const user = await newUser.save()

        const token = generateToken(res, user._id)

        res.status(200).json({
            success: true,
            message: "User created successfully",
            newUser: {
                ...user._doc,
                password: undefined
            },
            token
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }

    res.json({
        message: "Registration successfull!"
    })
}

const userLogin = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).jso({
                success: false,
                message: "User does not exist!"
            })
        } 

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const token = generateToken(res, user._id)

        await user.save()

        res.status(200).json({
            success: true,
            message: "Login successfull!",
            user: {
                ...user._doc,
                password: undefined
            },
            token
        })

    } catch (error) {
        console.log("Login error! ", error)
        res.status(400).json({
            success: false,
            message: "Invalid credentials!"
        })
    }

}

const adminLogin = async (req, res) => {

    const { email, password } = req.body

    try {
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({
                success: false,
                message: "Invalid email!"
            });
        }

        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: false,
                message: "Invalid password!"
            })
        }

        const token = generateAdminToken(res, email)

        res.status(200).json({
            success: true,
            message: "Admin logged in successfully!",
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: error,
            message: error.message
        })
    }
}

export { userLogin, userSignup, adminLogin }