const bcrypt = require("bcryptjs");
const { Status } = require("../../config/constant.config");
const { generateRandomString, dateCreate } = require("../../utilities/helper");
const userModel = require("./user.model");
const cloudinarySvc = require("../../service/cloudinary.service");

//we write this code here instead of auth.controller as we have to register user in multiple places and we
// can easily call this function and register user
class userService {
  async transformDataToUser(req) {
    try {
      const data = req.body;
      //logic
      //db store

      // 
     
      data.password = bcrypt.hashSync(data.password, 12);

     if(!req.file){
      throw{code:400,detail:{image:'Image required'},message:'Validation failed',status:'VALIDATEION_ERR'}
     }

       data.image = await cloudinarySvc.singleFileUpload(req.file.path, 'users');// response of cloudinary is added to data obj

      data.status = Status.INACTIVE;

      data.activationToken = generateRandomString();

      data.expiry= dateCreate(new Date(),1)

      //data store  in db
      //email for activation

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeUser(data) {
    try {
      const userObj = new userModel(data);
      return await userObj.save();
    } catch (exception) {
      throw exception;
  
    }
  }

//query to get data from database

async getSingleRowByFilter(filter){
  try{
    
    const userDetail= await userModel.findOne(filter)
    // console.log('getSingleRowByFilter:',userDetail)
  return userDetail
  }catch(exception){
    throw exception
  } 
}

  
async updateSingleRowByFilter(filter,data){
  try{
   const userDetail=await userModel.findOneAndUpdate(filter,{$set:data}, { returnDocument: 'after' } );
   return this.getUserProfile(userDetail);
  }catch(exception){
    throw exception
  } 
}


  getUserProfile(userObj) {
    return {
      _id: userObj._id ?? "",
      name: userObj.name ?? "",
      email: userObj.email ?? "",
      role: userObj.role ?? "",
      image: userObj.image ?? "",
      address: userObj.address ?? "",
      phone: userObj.phone ?? "",
      dob: userObj.dob ?? "",
      gender: userObj.gender ?? "",
      status: userObj.status ?? "",
      password: userObj.password ?? "",
    };
  }
}

const userScv = new userService();
module.exports = userScv;


