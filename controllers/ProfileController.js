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
            next(error);
        }
    }

    static async profileUpdate(req, res, next) {
        try {            
            const {userId} = req.loginInfo            
            const {first_name, last_name} = req.body

            if(!userId) {
                throw {name: "Unauthorized"}
            }

            const user = await User.findByPk(userId)

            if(!user) {
                throw {name: "NotFound"}
            }

            user.first_name = first_name
            user.last_name = last_name
            await user.save()

            res.status(200).json({
                status: 0,
                message: "Update Profile berhasil",
                data: {
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    profile_image: user.profile_image
                }
            })


        } catch (error) {
            next(error)
        }
    }

    static async profileUpdateImage(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports=ProfileController