import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';

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
})