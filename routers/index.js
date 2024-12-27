const express = require("express")
const router = express.Router()
const AuthController = require("../controllers/AuthController.js")
const errorHandler = require("../middlewares/errorHandler.js")

router.post("/registration", AuthController.register)
router.post("/login", AuthController.login)

router.use(errorHandler)
module.exports=router