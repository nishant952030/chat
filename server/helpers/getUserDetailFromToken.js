const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const { get } = require('mongoose')
const getUserDetailFromToken = async (token) => {
    
    if (!token) {
       console.log('token before token validation', token)
        return {
            message: "session out",
            logout: true,
        }
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await UserModel.findById(decode.id).select("-password")
    return user
}
module.exports = getUserDetailFromToken