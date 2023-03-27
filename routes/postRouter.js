
const express = require("express")
const postRouter = express.Router()

const { postModel } = require("../models/postModel")

const jwt = require("jsonwebtoken")



postRouter.get("/",async(req,res)=>{

    const token = req.headers.token
    const decode = jwt.verify(token,"msi")
    try
    {
        
        const posts = await postModel.find({"userId":decode.userId})
        
        
        res.status(200).send(posts)
    }
    
    catch(err)
    {
        res.status(400).send({"msg":err})

    }

})

////////////

postRouter.get('/:page', async (req, res) => {
    try{
    const page = parseInt(req.params.page);
    const Size = 3;
    const skip = (page - 1) * Size; 
  
    const posts = await postModel.find().skip(skip).limit(Size);
    res.send(posts);
   }
   catch(err)
   {
    res.status(400).send({"err":err})
   }
  });


/////////// 

 postRouter.post("/add",async(req,res)=>{
 
    try
    {
       const post = new postModel(req.body)
       await post.save()
       res.status(200).send({"msg":"post added"})
    }
    catch(err)
    {
        res.status(400).send({"msg":err})

    }

 })

 postRouter.patch("/update/:id",async(req,res)=>{

  
    const {id} = req.params;
    const token = req.headers.token
    const data =req.body;
        
    
    try
    {
        const post = await postModel.findOne({_id:id})
        
        const decode=jwt.verify(token,"msi")

        if(decode.userId===post.userId)
        {
           const deletePost = await postModel.findByIdAndUpdate({_id:id},data)
           res.status(200).send({"msg":"update deone"})
        }
        else
        {
            res.status(400).send({"msg":"error"})
        }
    }

    catch(err)
    {
        res.status(400).send({"msg":err})
    }

 })


 /////// 

 postRouter.delete("/delete/:id",async(req,res)=>{

     const {id} = req.params;
    const token = req.headers.token
    
        
    
    try
    {
        const post = await postModel.findOne({_id:id})
        
        const decode=jwt.verify(token,"msi")

        if(decode.userId===post.userId)
        {
           const deletePost = await postModel.findByIdAndDelete({_id:id})
           res.status(200).send({"msg":"delete deone"})
        }
        else
        {
            res.status(400).send({"msg":"error"})
        }
    }

    catch(err)
    {
        res.status(400).send({"msg":err})
    }

 })

 module.exports={
    postRouter
 }