import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is missing or invalid'
            })
        }

        const token = authHeader.split(' ')[1]

        // verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        // find user
        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // attach user to request
        req.user = user._id

        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired'
            })
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
}
