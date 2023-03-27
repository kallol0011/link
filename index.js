
const express = require ("express")
const { userRouter } = require ("./routes/userRouter")

const {connection} = require ("./db")
const { authorization } = require("./middleware/authMiddleware")
const { postRouter } = require("./routes/postRouter")

const cors = require ("cors")
const app= express()



app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(authorization)
app.use("/posts",postRouter)

// app.get("/",(req,res)=>{
//     res.send("working")
// })


const port = process.env.PORT

app.listen(port,async()=>{
   try
   {
     await connection
   console.log("connect to database")

   }
   catch(error)
   {
    console.log(error)
   }
   console.log(`server is running on port ${port}`)
})