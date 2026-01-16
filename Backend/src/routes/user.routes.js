import express from 'express'
import { login, registerUser, reVerify, verifyUser } from '../controllers/user.controllers.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/verify',verifyUser)
router.post('/re-verify',reVerify)
router.post('/login', login)


export default router