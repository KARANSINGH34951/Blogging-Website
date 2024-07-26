const mongoose =require("mongoose")

const commentSchema= mongoose.Schema({
  content:{
    type:String,
    require:true,
    required:true
  },
  blogId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog",
    required:true
  }
  ,
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{timestamps:true})

module.exports=mongoose.model("Comment",commentSchema);