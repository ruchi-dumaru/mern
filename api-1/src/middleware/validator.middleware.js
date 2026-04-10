//custom func to validate data
const bodyValidator=(rules)=>{
  return async (req,res,next)=>{
    try{
     const data=req.body;
    if(!data){
      next({code:422,
        message:"Insert data...",
        status:"VALIDATION_ERR"
      })

      await rules.validateAsync(data,{abortEarly:false})
      //validated data
      next()

    }
    }catch(exception){
  console.log(exception)
    }
  }
}

module.exports=bodyValidator