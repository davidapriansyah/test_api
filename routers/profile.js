const express = require("express")
const router = express.Router()
const ProfileController = require("../controllers/ProfileController")

router.get("/", ProfileController.getProfile)
router.put("/update", ProfileController.profileUpdate)
router.put("/image", ProfileController.profileUpdateImage)

module.exports=router