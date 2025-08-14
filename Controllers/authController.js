import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../JWT/getToken.js";


const loggingIn = async(req, res) => {
    const { gmail, password } = req.body
    if(!gmail || !password) {
        return res.status(400).json({message: "Please provide all fields"})
    }

    try {
        const user = await User.findOne({gmail})
        if(!user) {
            return res.status(400).json({message: "User not found, register first"})
        }

        //comparing password with hashed password
        const comparedPassword = await bcrypt.compare(password, user.password)
        if(!comparedPassword) {
            return res.status(400).json({message: "Invalid gmail or password"})
        }

        //set cookie token
        const token = generateToken(user._id)
        return res
                  .cookie("token", token, {httpOnly: true, sameSite: 'strict'})
                  .status(200)
                  .json({message: "successfully loggedIn"})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export default loggingIn