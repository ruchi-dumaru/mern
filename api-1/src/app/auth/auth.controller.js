//user registration
//http://localhost:9001/api/v1/auth/register/

//account activation
//dynamic or paramaterized router
//http://localhost:9001/api/v1/auth/activate/9891gdfnb3$$


class AuthController{
 registerUser=(req, res) => {
  res.status(201).json({
    description: "",
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
  res.json({
    data:{},
    message:"Fetch logged In User",
    status:"OK"
  })
}
}

const authCtrl=new AuthController();
module.exports=authCtrl