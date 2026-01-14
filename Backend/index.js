import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/database.ecommerce.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`)
})
