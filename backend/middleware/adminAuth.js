import jwt from 'jsonwebtoken'

export const adminAuth = async (req, res, next) => {
    const token  = req.headers.token

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized - no token provided!"
        })
    }

    try {


        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (decodedToken.adminEmail !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({
                success: false,
                message: "Not authorized. Invalid admin!"
            })
        }

        req.adminEmail = decodedToken.adminEmail
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Unauthorized - invalid or expired token!"
        });
    }
}