require("dotenv").config();//.env available to this file

const DBConfig = {
  mongodbUrl: process.env.MONGODB_URL,
  mongodbName: process.env.MONGODB_DB_NAME,
};
// constant expose

module.exports = {
  DBConfig
};

// we have taken excess of config such that we don't need to import dotenv pkg in multiple pg
//integration of mongodb in project is required which is done by mongoose ODM we write it's code in separate file

// operation:dbconnection and selection