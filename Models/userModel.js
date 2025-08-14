import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      username: { type: String, required: true},
      gmail: { type: String, required: true},
      password: { type: String, unique: true, required: true},
      admin: { type: Boolean, default: false}
}, { timestamps: true})

const User = mongoose.model("User", userSchema)

export default User