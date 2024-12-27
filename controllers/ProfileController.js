const {User} = require("../models/index.js")
const cloudinary = require("../helpers/cloudinary.js")
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
            const {userId} = req.loginInfo

            let user = await User.findByPk(userId)

            if(!user) {
                throw {name: "NotFound"}
            }

            if (!req.file) {
                throw {name: "errorUpload"}
            }

            const imageInBase64 = req.file.buffer.toString("base64");
            const data64 = `data:${req.file.mimetype};base64,${imageInBase64}`;

            const upload = await cloudinary.uploader.upload(data64, {
            public_id: `user_${userId}__profile`,
            tags: ["profile"],
            });

            await user.update({ profile_image: upload.secure_url });

            res.status(200).json({
                status: 0,
                message: "Update Profile Image berhasil",
                data: {
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    profile_image: upload.secure_url,
                },
            });
        } catch (error) {
          next(error)
        }
    }

}

module.exports=ProfileController