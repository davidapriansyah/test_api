const express = require("express")
const router = express.Router()
const InformationController = require("../controllers/InformationController.js")
const AuthController = require("../controllers/AuthController.js")
const TransactionController = require("../controllers/TransactionController.js")
const errorHandler = require("../middlewares/errorHandler.js")
const authentication = require("../middlewares/authentication.js")
const profileRoute = require("./profile.js")
const transactionRoute = require("./transaction.js")

router.post("/registration", AuthController.register)
router.post("/login", AuthController.login)
router.use(authentication)
router.use("/profile", profileRoute)
router.use("/transaction", transactionRoute)
router.get("/banner", InformationController.getBanner)
router.get("/services", InformationController.getService)
router.get("/balance", TransactionController.getBalance)
router.post("/topup", TransactionController.topUp)

router.use(errorHandler)
module.exports=router