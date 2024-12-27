const express = require("express")
const router = express.Router()
const TransactionController = require("../controllers/TransactionController")

router.post("/", TransactionController.transactionPost)
router.get("/history", TransactionController.getTransactionHistory)

module.exports=router