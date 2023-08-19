const express = require("express")
const cors = require("cors")
require("./app/src/config/dbConfig").getDbConnection()

const categoryRoutes = require("./app/src/routes/category.routes")
const productRoutes = require("./app/src/routes/product.routes")
const publicRoutes = require("./app/src/routes/public.routes")

const sessionControllerDb= require("./app/src/controller/sessionControllerDb")

const authMiddlerware = require("./app/src/middleware/auth.middleware")
const app = express()

//middlerware 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

//private ->authenticated 
app.use("/admin",authMiddlerware,categoryRoutes)
app.use("/admin",authMiddlerware,productRoutes)

//public 
app.use("/public",publicRoutes)
app.post("/signup",sessionControllerDb.signup)
app.get("/getallusers",sessionControllerDb.getAllusers)
app.post("/login",sessionControllerDb.login)


app.delete("/deleteuser/:userId",sessionControllerDb.deleteUserById)
app.get("/getuserbyid/:userId",sessionControllerDb.getUserById)
app.put("/updateuser",sessionControllerDb.updateUser)


app.listen(9999)
console.log("server started 9999");