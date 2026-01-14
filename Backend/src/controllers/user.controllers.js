import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'

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
    const hashPassword = await bcrypt.hash(password,10)
    console.log("hashpassword:",hashPassword);
    

     // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password :hashPassword
    })

     res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName
        }
    })
})