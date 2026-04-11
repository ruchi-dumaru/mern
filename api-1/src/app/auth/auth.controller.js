
//dynamic or paramaterized router
//http://localhost:9001/api/v1/auth/activate/9891gdfnb3$$

const bcrypt=require('bcryptjs')
const { Status } = require('../../config/constant.config')
const { generateRandomString } = require('../../utilities/helper')

class AuthController{
  
 registerUser=(req, res,next) => {
  const data=req.body
  //logic
  //db store

  //encrypt
  data.password=bcrypt.hashSync(data.password,12)

  //active status
  //access token
   data.status=Status.INACTIVE

   //activation token

   data.activationToken=generateRandomString()

   //data store  in db
   //email for activation

  res.status(201).json({
   data:data,
    message: "User registered succesfully",
    status: "OK",
  });
}

activateUser=
(req,res,next)=>{
  const params=req.params
  const query=req.query
  res.json({
   data:{
    params,
    query
   },
   message:"Activation route",
   status:"OK"
  })
}

loginUser=(req,res)=>{
  res.json({
    data:{},
    message:"User logged In",
    status:"OK"
  })
}

getLoggedInUser=(req,res)=>{
  // Is the user logged In  ?
   //success=> response
     //failure=>error msg
  res.json({
    data:{},
    message:"Fetch logged In User",
    status:"OK"
  })
}

updateUserProfile=(req,res)=>{
  // Is the user logged In  ?
   //success=> response
     //failure=>error msg
  res.json({
    data:{},
    message:"Can Update Profile",
    status:"OK"
  })
}
}

const authCtrl=new AuthController();
module.exports=authCtrl