const express = require("express");
const {dbConncetion}=require("./db.config")
const router=require("./router.config");
const errorHandler=require('../middleware/error-handling.middleware');
const { truncates } = require("bcryptjs");
const app = express();
const cors=require("cors")

//middleware for receuving data
//parser
//json



//corsallow
app.use(cors({
  origin:"http://localhost:5173"
}));




app.use(express.json({
  limit:"2mb"
}))

//urlencoded
app.use(express.urlencoded({
  limit:"2mb"
}))


//router mount
app.use('/api/v1',router)

//global middleware
//route not found
app.use((req,res,next)=>{
 next({code:404,message:"Not found",status:"NOT_FOUND_ERR"})
})

//mongodb connection
dbConncetion()

//error handling middleware
app.use(errorHandler)
module.exports = app;
