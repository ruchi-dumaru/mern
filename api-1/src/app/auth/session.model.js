const mongoose=require("mongoose");

const SessionSchema= new mongoose.Schema({
  user:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  },
  accessToken:{
    type:String,
    required:true
  },
  device:{
    type:String,
    required:true,
    default:"web",
  
  },
   data:String

},{
  timestamps:true,
  autoCreate:true,
  autoIndex:true
})

const SessionModel=mongoose.model("session",SessionSchema)

module.exports=SessionModel

