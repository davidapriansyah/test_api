 const {Balance, Transaction, Service} = require("../models/index")
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
            const {userId} = req.loginInfo
            let {top_up_amount} = req.body

            top_up_amount = Number(top_up_amount);


            if(!userId) {
                throw {name: "Unauthorized"}
            }

            if(isNaN(top_up_amount) || top_up_amount <= 0) {
                throw {name: "BadRequestTopUp"}
            }

            let balance = await Balance.findOne({
                where: {userId}
            })

            if(!balance) {
                balance = await Balance.create({
                    where: {userId, balance:0}
                })
            }

            balance.balance += top_up_amount
            await balance.save()

            const date = new Date();
            const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString()
            .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
            const lastTransaction = await Transaction.findOne({
            where: { transaction_type: "TOPUP" },
            order: [["createdAt", "DESC"]],
            });

            const lastInvoiceNumber = lastTransaction
            ? parseInt(lastTransaction.invoice_number.split("-")[1], 10)
            : 0;
            const newInvoiceNumber = `INV${formattedDate}-${String(lastInvoiceNumber + 1).padStart(3, "0")}`;

            await Transaction.create({
            userId,
            invoice_number: newInvoiceNumber,
            transaction_type: "TOPUP",
            description: "Top Up balance",
            total_amount: top_up_amount,
            created_on : new Date()
            });

            res.status(200).json({
                status: 0,
                message: "Top Up Balance berhasil",
                data: {
                  balance: balance.balance,
                },
            });

        } catch (error) {
            next(error)
        }
    }

    static async transactionPost(req, res, next) {
        try {
            const {userId} = req.loginInfo
            const {service_code} = req.body

            if(!userId) {
                throw {name: "Unauthorized"}
            }

            const getService = await Service.findOne({
                where: {service_code}
            })

            console.log(getService, "data service")

            if(!getService) {
                throw {name: "NotFoundService"}
            }

            const balance = await Balance.findOne({
                where: {userId}
            })

            if(!balance || balance < getService.service_tariff) {
                throw {name: "saldo tidak mencukupi"}
            }

            balance.balance -= getService.service_tariff;
            await balance.save();

            const date = new Date();
            const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
            const lastTransaction = await Transaction.findOne({
            where: { userId },
            order: [["createdAt", "DESC"]],
            });

            const lastInvoiceNumber = lastTransaction
            ? parseInt(lastTransaction.invoice_number.split("-")[1], 10)
            : 0;
            const newInvoiceNumber = `INV${formattedDate}-${String(lastInvoiceNumber + 1).padStart(3, "0")}`;

            const transaction = await Transaction.create({
                userId,
                invoice_number: newInvoiceNumber,
                transaction_type: "PAYMENT",
                description: getService.service_name,
                total_amount: getService.service_tariff,
                created_on : new Date()
              });
        
              res.status(200).json({
                status: 0,
                message: "Transaksi berhasil",
                data: {
                  invoice_number: transaction.invoice_number,
                  service_code: getService.service_code,
                  service_name: getService.service_name,
                  transaction_type: transaction.transaction_type,
                  total_amount: transaction.amount,
                  created_on: transaction.created_on,
                },
              });

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async getTransactionHistory(req, res, next) {
        try {
            const {userId} = req.loginInfo
            const {offset = 0, limit = 3} = req.query

            if (!userId) {
                throw { name: "Unauthorized" };
            }

            const transactions = await Transaction.findAll({
                where: { userId },
                order: [["createdAt", "DESC"]],
                offset: parseInt(offset), 
                limit: parseInt(limit), 
                attributes: [
                    "invoice_number",
                    "transaction_type",
                    "description",
                    "total_amount",
                    "created_on"
                ],
            });

            const records = transactions.map(transaction => ({
                invoice_number: transaction.invoice_number,
                transaction_type: transaction.transaction_type,
                description: transaction.description,
                total_amount: transaction.total_amount,
                created_on: transaction.created_on,
            }));

            res.status(200).json({
                status: 0,
                message: "Get History Berhasil",
                data: {
                    offset: parseInt(offset),
                    limit: parseInt(limit),
                    records
                }
            });
         } catch (error) {
            console.log(error)
            next(error)
        }
    }
 }

 module.exports=TransactionController