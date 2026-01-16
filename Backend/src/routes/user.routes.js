import express from 'express'
import { login, logout, registerUser, reVerify, verifyUser } from '../controllers/user.controllers.js'
import {isAuthenticated} from '../middlewares/isAuthenticated.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/verify',verifyUser)
router.post('/re-verify',reVerify)
router.post('/login', login)
router.post('/logout',isAuthenticated,logout)


export default router