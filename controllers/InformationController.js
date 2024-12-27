const {Banner} = require("../models/index")
const {Service} = require("../models/index")
class InformationController{
    static async getBanner(req, res, next) {
        try {
            const banner = await Banner.findAll({
                attributes: ["banner_name","banner_image","description"]
            })

            if(!banner) {
                throw {name: "NotFound"}
            }

            res.status(200).json({
                status: 0,
                message: "sukses",
                data: banner
            })
        } catch (error) {
            next(error)
        }
    }

    static async getService(req, res, next) {
        try {
            const {userId} = req.loginInfo
            const service = await Service.findAll({
                attributes: ["service_code", "service_name","service_icon","service_tariff"]
            })

         if(!userId) {
                throw {name: "Unauthorized"}
            }
        
        if(!service) {
            throw {name: "NotFound"}
        }

        res.status(200).json({
            status: 0,
            message: "Sukses",
            data: service
        })
        
        } catch (error) {
            next(error)
        }
    }
}

module.exports=InformationController