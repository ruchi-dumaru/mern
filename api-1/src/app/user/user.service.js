const bcrypt = require("bcryptjs");
const { Status } = require("../../config/constant.config");
const { generateRandomString } = require("../../utilities/helper");
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

       data.image = await cloudinarySvc.singleFileUpload(req.file.path, 'users');// response of cloudinary is added to data obj

      data.status = Status.INACTIVE;

      data.activationToken = generateRandomString();

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
      // throw {
      //   code: 500,
      //   message: "User cannot be registered ",
      //   status: "USER_REGISTERATION_ERR",
      // };
    }
  }

  getUserProfile(userObj) {
    return {
      _id: userObj._id ?? "",
      name: userObj.name ?? "",
      email: userObj.name ?? "",
      role: userObj.role ?? "",
      image: userObj.image ?? "",
      address: userObj.address ?? "",
      phone: userObj.phone ?? "",
      dob: userObj.dob ?? "",
      gender: userObj.gender ?? "",
      status: userObj.status ?? "",
    };
  }
}

const userScv = new userService();
module.exports = userScv;

// const userSvc = new userService();
// module.exports = userSvc;

// registerUser=async (req,res,next)=>{
//   try{
// const data = userSvc.transformToUserData(req);
//   const user=await userSvc.storeUser(data)

//   req.json({
//     data:userSvc.getUserProfile(user)
//   })
//   }catch(exception){
//     next(exception)
//   }
