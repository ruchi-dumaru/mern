const errorHandler=(err,req,res,next)=>{
  let detail=err.details||err.detail||null;
  let code=err.code||500;
  let message=err.message||"Internal Server Err...";
  let status=err.status||"APP_ERR"
res.status(code).json({
  error:detail,
  message:message,
  status:status
 })
}

module.exports=errorHandler