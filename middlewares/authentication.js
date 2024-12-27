const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models/index.js");

const authentication = async (req, res, next) => {
    try {
        const {authorization} = req.headers

        if(!authorization) {
            throw {name: "Unauthorized"}
        }

        const token = authorization.split(' ')[1]
        const payload = verifyToken(token)
        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })
        if(!user) {
            throw {name: "Unauthorized"}
        }
        req.loginInfo = {
            userId : user.id,
            email : user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication