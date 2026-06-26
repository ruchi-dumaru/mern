//middleware
//closure:the fucntion having lexical scope whre the child function can excess the variable of the parent func even when the parent func terminated

const authService = require("../app/auth/auth.service");
const jwt=require("jsonwebtoken");
const { AppConfig } = require("../config/config");
const { userRoles } = require("../config/constant.config");
const auth = (roles=null) => {
  //token
  //token db verify
  //token verify
  //user Detail fetch
  //req add
  //permission check
  //next()
  //  next({})
  return async(req,res,next)=>{
     try{
      
let token =req.headers['authorization']??null;
// console.log(token);
if(!token){
  throw{code:401,message:"Unauthorized access" ,status:"UNAUTHORIZED_ACCESS_ERR"}
}
//token found
token=token.replace("Bearer ","");
const sessionInfo= await authService.getSingleRowByFilter({
  accessToken:token
});

console.log("2nd sessionInfo:"+sessionInfo);
if(!sessionInfo){
  throw{code:401,message:"Session not found",status:"SESSION_NOT_FOUND_ERR"}
}

//session found
const decodedToken=jwt.verify(token,AppConfig.jwtSecret);
// console.log("3rd decodedToken:"+decodedToken);
if(decodedToken.typ!=="Bearer"){
  throw{code:401,message:"Invalid Token Type",status:"SESSION_NOT_FOUND_ERR"}
}

if(!sessionInfo.user){
throw{code:401,message:"Associated User Not Found",status:"ASSOCIATED_USER_NOT_FOUND_ERR"}
}

//future
//req manipulation
req.loggedInUser= sessionInfo.user
// console.log(sessionInfo.user)

if(!roles|| sessionInfo.user.role===userRoles.Admin||
  roles.includes(sessionInfo.user.role)
){
  
return next()
}
else{
  throw{code:403,message:"Permission denied for"+sessionInfo.user.role,status:"PERMISSION_DENIED_ERR"}
}

  }
  catch(exception){
  
    //  console.error("THE REAL MIDDLEWARE ERROR IS:", exception);

if (exception.name === 'TokenExpiredError'){
  exception.code=401
  exception.message=exception.message||"Internal Server Err"
  exception.status="TOKEN_EXPIRED_ERR"
}
else if(exception.name === 'JsonWebTokenError'){
  exception.code=401
  exception.message=exception.message||"Internal Server Err"
  exception.status="TOKEN_EXPIRED_ERR"
  exception.status="TOKEN_EXPIRED_ERR"
}
return next(exception); 
  }
  }
 
};
module.exports = auth;
