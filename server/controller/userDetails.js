const getUserDetailFromToken = require("../helpers/getUserDetailFromToken")

async function userDetails(req, res) {
    try {
        const token = req.cookies.token || ""
        console.log('taken from getuser', token)
        const user = await getUserDetailFromToken(token)

        return res.status(200).json({
            message: 'user Details',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            messgae: error.messgae || error,
            error: true
        })
    }
}
module.exports = userDetails