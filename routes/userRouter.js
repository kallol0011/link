const express = require("express")

const userRouter = express.Router()

const jwt = require ("jsonwebtoken")
const bcrypt = require ("bcrypt")

const { UserModel } = require ("../models/userModel")


userRouter.post("/register",async(req,res)=>{

    const {email,name,gender,password,age,city,is_married }=req.body;
    try{
         bcrypt.hash(password,7,async(err,hash)=>{
            const user = new UserModel({name,email,password:hash,gender,age,city,is_married})
            await user.save()
            res.status(200).send({"msg":"register successful"})
         })
    }
    catch(error)
    {
        res.status(400).send({"msg":error})
    }

})

userRouter.post("/login",async(req,res)=>{

    const {email,password}=req.body
    try
    {
        const user = await UserModel.findOne({email})

        if(user)
        {
            console.log(user)
            bcrypt.compare(password,user.password,(err,result)=>{
               if(result)
               {
                res.status(200).send({"msg":"login successful","token":jwt.sign({"userId":user._id},"msi")})
               }
               else
               {
                res.status(400).send({"msg":"wrong input"})
               }
            })
        }
    }
    catch(error)
    {
        res.status(400).send({"msg":error})
    }

})
 
module.exports={
    userRouter
}

// 642167ba3841b20a20302efc