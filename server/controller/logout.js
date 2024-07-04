async function logout(req, res) {
    try {

        const cookieOption = {
            httpOnly: true,
            secure: true
        };
        console.log('logout page',req)
        return res.cookie('token','',cookieOption).status(200).json({
            message: "session out",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: " coudnt logout",
            error: true
        })
    }
}module.exports=logout