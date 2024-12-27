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
            console.log(error)
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports=AuthController