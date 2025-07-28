import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized - no token provided!"
        })
    }

    //decode the user token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken.userId) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized User!"
            })
        }

        req.body.userId = decodedToken.userId
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Unauthorized - invalid or expired token!"
        });
    }
}

export default userAuth