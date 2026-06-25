const authRouter = require("express").Router();
const authCtrl=require('./auth.controller');
const auth=require('../../middleware/auth.middleware');
const bodyValidator=require('../../middleware/validator.middleware')
const {registerDTO,loginDTO,updateMyProfileDTO}=require('./auth.request');
const uploader = require("../../middleware/uploader.middleware");

//uploader() use to handle form data
//.none() if file type in not inserted
authRouter.post("/register",uploader().single('image'), bodyValidator(registerDTO),authCtrl.registerUser );
authRouter.get("/activate/:token",authCtrl.activateUser);
authRouter.get("/resend-token/:token",authCtrl.resendToken);


authRouter.post("/login",bodyValidator(loginDTO),authCtrl.loginUser);

// //access only by loggedin user
// authRouter.get('/me',auth(""),authCtrl.getLoggedInUser);
// authRouter.post('/my-profile',bodyValidator(updateMyProfileDTO),authCtrl.updateUserProfile)


module.exports = authRouter;
