const express = require("express");
const router=require("./router.config");
const app = express();

//router mount
// app.use(urlencoded,handler)
//versioning for mobile application 
// /api is prefix added in routing
app.use('/api/v1',router)

module.exports = app;
