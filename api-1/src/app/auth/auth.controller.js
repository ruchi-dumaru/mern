//user registration
//http://localhost:9001/api/v1/auth/register/

//account activation
//dynamic or paramaterized router
//http://localhost:9001/api/v1/auth/activate/9891gdfnb3$$


class AuthController{
  
 registerUser=(req, res,next) => {
  const data=req.body
  //logic
  //db store

  // next({code:400,message:"User not registered",status:"Not registered"})
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