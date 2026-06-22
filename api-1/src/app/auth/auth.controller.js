//dynamic or paramaterized router
//http://localhost:9001/api/v1/auth/activate/9891gdfnb3$$

const { Status } = require("../../config/constant.config");
const { generateRandomString, dateCreate } = require("../../utilities/helper");
const userScv = require("../user/user.service");
const authMailSvc = require("./auth.mail");



class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await userScv.transformDataToUser(req);
      const user = await userScv.storeUser(data);

     await  authMailSvc.activateUserAccount(user)
//smpt-->Gmail
//SMS-->GSM
//Push--->Google(firebase)
      res.status(201).json({
        data: userScv.getUserProfile(user),
        message: "User registered succesfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async(req, res, next) => {
    try{
 const token=req.params.token
  let userDetail= await userScv.getSingleRowByFilter({activationToken:token})


  if(!userDetail){
    throw{code:404,message:"Token not found",status:"TOKEN_NOT_FOUND"}
  }

  const today=Date.now()
  const expiry=userDetail.expiry.getTime()

  // if token expired
  if(today>expiry){
    throw{code:422,message:"Your token or link has been expired",status:"TOKEN_EXPIRED"}
  }

  //if token not expired user is activated

  userDetail= await userScv.updateSingleRowByFilter({_id:userDetail._id},{
    status:Status.ACTIVE,
    activationToken:null,
    expiry:null
  })

  // after user gets activated 
  //notify

  await authMailSvc.WelcomeMessageToUser(userDetail)

  res.json({
    data:userDetail,
   message:"Account activated successfully",
    status:"ACTIVATION_SUCCESS"
  })

  
    }catch(exception){
      next(exception)
    }
  }

  resendToken= async(req,res,next)=>{
 try{
 const token=req.params.token
  let userDetail= await userScv.getSingleRowByFilter({activationToken:token})


  if(!userDetail){
    throw{code:404,message:"Token not found",status:"TOKEN_NOT_FOUND"}
  }

  const today=Date.now()
  const expiry=userDetail.expiry.getTime()

  // if token expired
  if(today<=expiry){
    throw{code:422,message:"Your token or link has not been expired",status:"TOKEN_NOT_EXPIRED"}
  }

  //if token not expired user is activated

  const updateData={
    activationToken:generateRandomString(),
    expiry:dateCreate(new Date(),1),
  }

  userDetail= await userScv.updateSingleRowByFilter({_id:userDetail._id},
    updateData
  )

  //update
  userDetail.activationToken=updateData.activationToken
  

  await authMailSvc.resendTokenActivation(userDetail)

  res.json({
    data:userDetail,
   message:"Link reactivated",
    status:"OK"
  })

  
    }catch(exception){
      next(exception)
    }
  }

  loginUser = (req, res) => {
    res.json({
      data: {},
      message: "User logged In",
      status: "OK",
    });
  };

  getLoggedInUser = (req, res) => {
    // Is the user logged In  ?
    //success=> response
    //failure=>error msg
    res.json({
      data: {},
      message: "Fetch logged In User",
      status: "OK",
    });
  };

  updateUserProfile = (req, res) => {
    // Is the user logged In  ?
    //success=> response
    //failure=>error msg
    res.json({
      data: {},
      message: "Can Update Profile",
      status: "OK",
    });
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;


// try{
//     //   const token=req.params.token;
//     // const userDetail= await userScv.findUserByToken({activationToken:token})
//     // if(!userDetail){
//     //   throw{
//     //     code:404,
//     //     message:"Token not found or broken",
//     //     status:"TOKEN_NOT_FOUND"
//     //   }
//     // }
//     // }catch(exception){
//     //   throw exception
//     // }