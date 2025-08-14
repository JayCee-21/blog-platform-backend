import User from "../Models/userModel.js";
import bcrypt from "bcryptjs"


const registerUser = async(req, res) => {
     const { username, gmail, password } = req.body
     if(!username || !gmail || !password) {
        return res.status(400).json({message: "Please provide all fields"})
     }

     //checking for returning users
     try {
        const existingUser = await User.findOne({gmail})
        if(existingUser){
            return res.status(400).json({message: "Gmail already exist"})
        }

        // hashing of password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        if(gmail === process.env.ADMIN) {
            const user = new User({...req.body, password: hashedPassword, admin: true})
            await user.save()
        }
           const user = new User({...req.body, password: hashedPassword, admin: false})
           await user.save()
           return res.status(200).json({message: "User Created Successfully", user})

     } catch (error) {
        res.status(500).json({error:error.message})
     }
}

export default registerUser