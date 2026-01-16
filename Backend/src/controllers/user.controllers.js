import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import { verifyEmail } from '../utils/email.verify.js';

/* Register User */
export const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error("All fields are required");

    }

    console.log("firstName:", firstName);
    console.log("lastName:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);

    //  Check if user exists
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("Email already exist");

    }

    //hashed password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log("hashpassword:", hashPassword);


    // saved user
    const savedUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword
    })

    //token 
    // Generate verification token
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, { expiresIn: '60m' })
    // Send verification email
    //  verifyEmail(token, email)  //from email.verify.js
    savedUser.token = token

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: savedUser._id,
            email: savedUser.email,
            firstName: savedUser.firstName,
            token
        }
    })
})

/* Verify user */
export const verifyUser = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401)
        throw new Error("Authorization token is missing or invalid")
    }

    // Get token
    const token = authHeader.split(' ')[1] // lloks like -> [Bearer, 884cakks09jd]

    let decoded
    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                message: "The verification token has expired"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
    }

    // Find user
    const user = await User.findById(decoded.id)
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }

    // Update user verification status
    user.token = null
    user.isVerified = true
    await user.save()

    res.json({
        success: true,
        message: "User verified successfully"
    })
})

/* reVerify */

export const reVerify = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.status(400)
        throw new Error("Email is required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }

    // If already verified
    if (user.isVerified) {
        res.status(400)
        throw new Error("User is already verified")
    }

    // Generate new token
    const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '60m' }
    )

    // Save token in DB
    user.token = token
    await user.save()

    // Send verification email (IMPORTANT: await)
    await verifyEmail(token, email)

    res.status(200).json({
        success: true,
        message: "Verification email sent again successfully"
    })
})