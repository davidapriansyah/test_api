 const {Balance} = require("../models/index")
 class TransactionController {
    static async getBalance(req, res, next) {
        try {
            const {userId} = req.loginInfo

            if(!userId) {
                throw {name: "Unauthorized"}
            }
            
            const balance = await Balance.findOne({
                where: { userId }, 
                attributes: ["balance"]
            });


            if(!balance) {
                throw {name: "NotFound"}
            }

            res.status(200).json({
                status: 0,
                message: "Get Balance berhasil",
                data: balance
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async topUp(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
    static async transactionPost(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
    static async getTransactionHistory(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
 }

 module.exports=TransactionController