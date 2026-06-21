//custom func to validate data
const bodyValidator = (rules) => {
  
  return async (req, res, next) => {
    try {
      const data = req.body;
      
      if (!data) {
        console.log("data empty");
        next({
          code: 422,
          message: "Insert data...",
          status: "VALIDATION_ERR",
        });
      }

      await rules.validateAsync(data,{abortEarly:false});
        //validated data
        next();
    } catch (exception) {
      console.log(exception);
      let errBag={};

      if(exception.details){
        exception.details.map((error)=>{
          console.log(error)
          let key=error.path[0];
       errBag[key]=error.message //this populate errBag
        })
      }
      next({
        detail:errBag,
        code:400,
        message:"Validation failure",
        status:"VALIDATION_ERR"
      })
    }
  };
};

module.exports = bodyValidator;
