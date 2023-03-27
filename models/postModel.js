
const mongoose = require ("mongoose")

const noteSchema=mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_of_comments : Number,
    userId:String

})

const postModel=mongoose.model("note",noteSchema)

module.exports={
    postModel
}
