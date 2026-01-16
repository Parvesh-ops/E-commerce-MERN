import express from 'express'
import { registerUser, reVerify, verifyUser } from '../controllers/user.controllers.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/verify',verifyUser)
router.post('/re-verify',reVerify)


export default router