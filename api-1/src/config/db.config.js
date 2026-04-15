// // mongodb server connection

const mongoose = require("mongoose");
const { DBConfig } = require("./config");

const dbConncetion = async () => {
  try {
    await mongoose.connect(DBConfig.mongodbUrl, {
      dbName: DBConfig.mongodbName,
      autoCreate: true,
      autoIndex: true
      
    });
    console.log("############ MongoDB Connection Successfull ################")
  } catch (exception) {
    console.log(exception);
    process.exit(1);
    throw {
      code: 500,
      message: "Server Conncetion Error",
      status: "SERVER_CONNECTION_ERR",
    };
  }
};

module.exports={
  dbConncetion
}