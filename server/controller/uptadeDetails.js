const getUserDetailFromToken = require('../helpers/getUserDetailFromToken');
const UserModel = require('../models/user');

async function updateUserDetails(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                error: true
            });
        }

        const user = await getUserDetailFromToken(token);
        if (!user) {
            return res.status(401).json({
                message: "Invalid token",
                error: true
            });
        }

        const { name, profile_pic } = req.body;
        if (!name || !profile_pic) {
            return res.status(400).json({
                message: "Missing required fields",
                error: true
            });
        }

        const updateUser = await UserModel.updateOne(
            { _id: user._id },
            { $set: { name: name, profile_pic: profile_pic } }
        );

        if (updateUser.nModified === 0) {
            return res.status(400).json({
                message: "User update failed",
                error: true
            });
        }

        const userInformation = await UserModel.findById(user._id).select('-password');

        return res.json({
            message: 'User updated successfully',
            data: userInformation,
            success: true
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = updateUserDetails;
