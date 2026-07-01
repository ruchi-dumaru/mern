const brandRouter = require("express").Router();
const { userRoles } = require("../../config/constant.config");
const auth = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const brandCtrl = require("./brand.controller");
const { BrandDataDTO } = require("./brand.request");
const multer=require('multer');
//brand route mount

// brandRouter.post("/", auth([userRoles.ADMIN]),uploader().single("logo"),bodyValidator(BrandDataDTO),brandCtrl.createBrand);
brandRouter.post("/",auth([userRoles.ADMIN]),uploader().single("logo"),bodyValidator(BrandDataDTO),brandCtrl.createBrand
);


//public ra backend excess route for listing
brandRouter.get("/", auth([userRoles.ADMIN]),brandCtrl.listAllBrand);
brandRouter.get("/front-list",brandCtrl.frontlistAllBrand);

//private route
brandRouter.get("/:id",auth([userRoles.ADMIN]), brandCtrl.viewBrandDetailById);
brandRouter.get("/:slug/by-slug", brandCtrl.viewBrandDetailBySlug);
brandRouter.put("/:id",auth([userRoles.ADMIN]),uploader().single("logo"),bodyValidator(BrandDataDTO), brandCtrl.updateBrandById);
brandRouter.delete("/:id", auth([userRoles.ADMIN]),brandCtrl.deleteBrandById);

module.exports = brandRouter;

