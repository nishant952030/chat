const UserModel = require("../models/user")

async function checkEmail(req, res) {
    try {
        const { email } = req.body;
        const checkMail = await UserModel.findOne({ email }).select("-password")
        if (!checkMail) {
            return res.status(400).json({
                message: "User does not exist",
                error: true
            })
        }
        return res.status(200).json({
            message: "Email verified",
            success: true,
            data:checkMail
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}
module.exports=checkEmail