const {User} = require("../models/index.js")
class ProfileController{
    static async getProfile(req, res, next) {
        try {
            const {userId} = req.loginInfo; 

            const user = await User.findByPk(userId, {
                attributes: ["email", "first_name", "last_name", "profile_image"]
            });

            if (!user) {
                throw { name: "NotFound", message: "User not found" };
            }

            res.status(200).json({
                status: 0,
                message: "Sukses",
                data: user,
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async profileUpdate(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }

    static async profileUpdateImage(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports=ProfileController