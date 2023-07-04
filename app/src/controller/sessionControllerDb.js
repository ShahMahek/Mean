const { options } = require("moongose/routes")
const UserModel = require("../model/usersModel")
const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env
//signup 

module.exports.signup =  async function(req,res){
    //validation
    //email unique 

    // let user = new UserModel({
    //     firstName:req.body.firstName,
    //     email:req.body.email,
    //     password:req.body.password
    // })

    let user = new UserModel(req.body) 

   let data = await user.save() 

   res.json({data:data,msg:"signup done",rcode:200})
}


//login 
module.exports.login = async function(req,res){
    
    let email = req.body.email 
    let password = req.body.password 

    let user = await UserModel.findOne({email:email})
    
    if(user && user.password == password){
            token = jwt.sign({"email":user.email,"userId":user._id,"role":"user" },SEC_KEY)
            console.log("token "+token);
            res.json({data:user,msg:"Login done",rcode:200,token:token})
    }else{      
            res.json({data:req.body,msg:"Invalid Credentials",rcode:-9})
    } 
}