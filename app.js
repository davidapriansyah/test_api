if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
const PORT = process.env.PORT || 3000
const express = require("express")
const router = require("./routers/index.js")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    
})
