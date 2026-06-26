const authRouter = require("express").Router();
const authCtrl=require('./auth.controller');

const bodyValidator=require('../../middleware/validator.middleware')
const {registerDTO,loginDTO,updateMyProfileDTO}=require('./auth.request');
const uploader = require("../../middleware/uploader.middleware");
const auth = require("../../middleware/auth.middleware");
const { userRoles } = require("../../config/constant.config");

//uploader() use to handle form data
//.none() if file type in not inserted
authRouter.post("/register",uploader().single('image'), bodyValidator(registerDTO),authCtrl.registerUser );
authRouter.get("/activate/:token",authCtrl.activateUser);
authRouter.get("/resend-token/:token",authCtrl.resendToken);


authRouter.post("/login",bodyValidator(loginDTO),authCtrl.loginUser);

// //access only by loggedin user


authRouter.get("/me",auth([userRoles.SELLER]),authCtrl.getLoggedInUser);
authRouter.get("/logout",auth(),authCtrl.loggedOut);

authRouter.post('/my-profile',auth(['admin']),bodyValidator(updateMyProfileDTO),authCtrl.updateUserProfile)





module.exports = authRouter;
