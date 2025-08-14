import Router from 'express'
import loggingIn from '../Controllers/authController.js'

const authRouter = Router()

authRouter.post('/user/login', loggingIn)

export default authRouter