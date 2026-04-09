const authRouter = require("express").Router();
const authCtrl=require('./auth.controller');
const auth=require('../../middleware/auth.middleware');

authRouter.post("/register",authCtrl.registerUser );
authRouter.get("/activate/:token",authCtrl.activateUser);
authRouter.post("/login",authCtrl.loginUser);

//access only by loggedin user
authRouter.get('/me',auth(""),authCtrl.getLoggedInUser);
authRouter.post('/my-profile',authCtrl.updateUserProfile)


module.exports = authRouter;
