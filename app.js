require("dotenv").config

const express = require("express")
const router = require("./routers/index.js")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

module.exports=app