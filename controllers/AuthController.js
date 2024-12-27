const { compare } = require("../helpers/bcrypt.js")
const { signToken } = require("../helpers/jwt.js")
const {User} = require("../models/index.js")

class AuthController {
    static async register(req, res, next) {
        try {
            const {email, first_name, last_name, password} = req.body

            const users = await User.create({
                email, first_name, last_name, password 
            })
            res.status(201).json({
                status: 0,
                message: "Registrasi berhasil silahkan login",
                data: null
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body

            if(!email || !password) {
                throw {name : "BadRequest"}
            }

            const user = await User.findOne({
                where:{
                    email
                }
            })

            if(!user) {
                throw {name: "LoginError"}
            }

            if(!compare(password,user.password)) {
                throw {name: "LoginError"}
            }
            
            const payload = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name : user.last_name,
                profile_image: user.profile_image
            }

            const token = signToken(payload)
            res.status(200).json({
                status:0,
                message: "Login Sukses",
                data: {token : token}
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports=AuthController