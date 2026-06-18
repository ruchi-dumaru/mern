const errorHandler = (err, req, res, next) => {
  // console.log("Exception",err)

  let detail = err.details || err.detail || null;
  let code = err.code || 500;
  let message = err.message || "Internal Server Err...";
  let status = err.status || "APP_ERR";

  // console.log(err.name)

  //duplication of email
  if (err.name === "MongoServerError") {
    code = 422;
    ((message = "DB query failed"), (status = "DB_QUERY_ERR"));
    if (+err.code === 11000) {
      code = 400;
      message="Validation Failed"
      detail = {};
      //object.keys((email:1))=>['email'].map((fields))
      Object.keys((err.keyPattern)).map((field)=>{
        detail[field]=` this ${field} already exist`
      })
    }
  }

  res.status(code).json({
    error: detail,
    message: message,
    status: status,
  });
};

module.exports = errorHandler;
