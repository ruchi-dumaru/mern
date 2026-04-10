const authRouter = require("express").Router();
const authCtrl=require('./auth.controller');
const auth=require('../../middleware/auth.middleware');
const bodyValidator=require('../../middleware/validator.middleware')
const {registerDTO,loginDTO,updateMyProfileDTO}=require('./auth.request');


authRouter.post("/register",bodyValidator(registerDTO),authCtrl.registerUser );
authRouter.get("/activate/:token",authCtrl.activateUser);
authRouter.post("/login",bodyValidator(loginDTO),authCtrl.loginUser);

//access only by loggedin user
authRouter.get('/me',auth(""),authCtrl.getLoggedInUser);
authRouter.post('/my-profile',bodyValidator(updateMyProfileDTO),authCtrl.updateUserProfile)


module.exports = authRouter;
