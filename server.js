import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import connectDB from "./MongoDb/mongoDb.js"
import userRouter from "./Routes/userRoutes.js"
import authRouter from "./Routes/authRoute.js"
import postRouter from "./Routes/postRoute.js"
import commentRouter from "./Routes/commentRoute.js"


dotenv.config()
connectDB()
const app = express()


//Top level Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())




app.use("/api", userRouter)
app.use("/api", authRouter)
app.use("/api", postRouter)
app.use("/api", commentRouter)


const port = process.env.PORT




app.listen(port, () => {
    console.log(`Our Server is up and running on port ${port}`)
})