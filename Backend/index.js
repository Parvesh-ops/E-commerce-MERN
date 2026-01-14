import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/database.ecommerce.js'
import { errorHandler } from './src/middlewares/error.middelware.js'
import userRoutes from './src/routes/user.routes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT

//Middelware
app.use(express.json())

//routes
app.use('/api/v1/user',userRoutes)


//Global Error Middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`)
})
