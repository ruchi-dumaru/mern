const categoryRouter = require("express").Router();
const { userRoles } = require("../../config/constant.config");
const auth = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const categoryCtrl = require("./category.controller");
const { CategoryDataDTO } = require("./category.request");
const multer=require('multer');



//CRUD
//public ra backend excess route for listing
categoryRouter.get("/", auth([userRoles.ADMIN]),categoryCtrl.listAllCategories);
categoryRouter.get("/front-list",categoryCtrl.frontlistAllCategories);



//private route
categoryRouter.post("/",auth([userRoles.ADMIN]),uploader().single("icon"),bodyValidator(CategoryDataDTO),categoryCtrl.createCategory
);
categoryRouter.get("/:id",auth([userRoles.ADMIN]), categoryCtrl.viewCategoryDetailById);
categoryRouter.get("/:slug/by-slug", categoryCtrl.viewCategoryDetailBySlug);
categoryRouter.put("/:id",auth([userRoles.ADMIN]),uploader().single("icon"),bodyValidator(CategoryDataDTO), categoryCtrl.updateCategoryById);
categoryRouter.delete("/:id", auth([userRoles.ADMIN]),categoryCtrl.deleteCategoryById);

module.exports = categoryRouter;



  