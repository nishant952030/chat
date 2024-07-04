const { response } = require("express")
const UserModel = require("../models/user")
const bcryptjs = require('bcryptjs')
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profile_pic } = req.body
        const findEmail = await UserModel.findOne({ email })
        if (findEmail) {
            return res.status(400).json({
                message: "Email already exists",
                error: true
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password, salt)
        const payload = {
            name, email, profile_pic, password: hashpassword
        }
        const user = new UserModel(payload)
        const userSave = user.save();
        return res.status(200).json({
            message: "User created successfull",
            data: user,
            success: true
        })
    }
    catch (error) {
        console.log('Something went wrong', error)
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}
module.exports = registerUser