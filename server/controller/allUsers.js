const UserModel = require("../models/user");

const allUsers = async (request, response) => {
    try {
        const users = await UserModel.find({});
        if (users.length > 0) {
            return response.json({
                message: "All users fetched successfully",
                data: users,
                success: true
            });
        } else {
            return response.json({
                message: "No users found",
                data: [],
                success: true
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false
        });
    }
};

module.exports = allUsers;
