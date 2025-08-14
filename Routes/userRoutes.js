import Router from "express"
import registerUser from "../Controllers/userController.js"

const userRouter = Router()

userRouter.post("/register", registerUser)

export default userRouter