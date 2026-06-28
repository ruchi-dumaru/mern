const mongoose=require("mongoose");
const Status=require("../../config/constant.config")
const BrandSchema=new mongoose.Schema({
  name:{
    type:String,
    min:2,
    max:100,
    unique:true,
    required:true
  },
  status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
  slug:{
    type:String,
    required:true,
    unique:true
  },
  isFeatured:Boolean,
  logo:{
    id: String,
      optimizedUrl: String,
      originalUrl: String,
  },
   createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
      },
      UpdatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
      },
  
},{
  
    timestamps: true, //createdAt,updatedAt
    autoCreate: true,
    autoIndex: true,
  
})

const BrandModel= mongoose.model("Brand",BrandSchema)
module.exports=BrandModel