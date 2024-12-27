const express = require("express")
const router = express.Router()
const upload = require("../helpers/multer")
const uploadImage= upload.single("profile_image")
const ProfileController = require("../controllers/ProfileController")

router.get("/", ProfileController.getProfile)
router.put("/update", ProfileController.profileUpdate)
router.put("/image",uploadImage, ProfileController.profileUpdateImage)

module.exports=router