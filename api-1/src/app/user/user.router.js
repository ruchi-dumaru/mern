const userRouter = require("express").Router();
const { userRoles } = require("../../config/constant.config");
const auth = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const authCtrl = require("../auth/auth.controller");
const { registerDTO, updateUserProfileDTO } = require("../auth/auth.request");
const userCtrl = require("./user.controller");
const multer=require('multer');
//user route mount

// userRouter.post("/", auth([userRoles.ADMIN]),uploader().single("logo"),bodyValidator(UserDataDTO),userCtrl.createUser);
userRouter.post("/",auth([userRoles.ADMIN]),uploader().single("image"),bodyValidator(registerDTO),authCtrl.registerUser);
userRouter.get("/",auth(),userCtrl.listAllUsers)


//private route
userRouter.get("/:id",auth(), userCtrl.viewUserDetailById);
userRouter.put("/:id",auth([userRoles.ADMIN]),uploader().single("image"),bodyValidator(updateUserProfileDTO), userCtrl.updateUserById);
userRouter.delete("/:id", auth([userRoles.ADMIN]),userCtrl.deleteUserById);
// userRouter.get("/:slug/by-slug", userCtrl.viewUserDetailBySlug);


module.exports = userRouter;


    // "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTQxOWE4MjhmODU5NWYzMDRkOTQ0MzAiLCJ0eXAiOiJCZWFyZXIiLCJpYXQiOjE3ODMwNzQ5NTQsImV4cCI6MTc4MzE2MTM1NH0.Gz5wBwFkHKdXiUro57tz47wRJDhfFS1CZt-tNXY4upc",