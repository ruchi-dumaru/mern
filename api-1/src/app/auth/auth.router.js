const authRouter = require("express").Router();
const authCtrl=require('./auth.controller');

authRouter.post("/register",authCtrl.registerUser );
authRouter.get("/activate/:token",authCtrl.activateUser);
authRouter.post("/login",authCtrl.loginUser);
authRouter.get('/me',authCtrl.getLoggedInUser);


module.exports = authRouter;
