const authRouter = require("express").Router();
const authCtrl=require('./auth.controller');
const auth=require('../../middleware/auth.middleware');
const Joi=require('joi');
const bodyValidator=require('../../middleware/validator.middleware')

//rules for data validation
const registerDTO = Joi.object({
  name:Joi.string().min(3).max(30).required(),
  email:Joi.string().email().required(),
  password:Joi.string().required(),
  confirmPassword:Joi.ref('password'),
  role:Joi.string().allow('seller','customer').default('customer')
  // address:"",
  // gender:"",
  // dob:"",
  // image:""
})

authRouter.post("/register",bodyValidator(registerDTO),authCtrl.registerUser );
authRouter.get("/activate/:token",authCtrl.activateUser);
authRouter.post("/login",authCtrl.loginUser);

//access only by loggedin user
authRouter.get('/me',auth(""),authCtrl.getLoggedInUser);
authRouter.post('/my-profile',authCtrl.updateUserProfile)


module.exports = authRouter;
