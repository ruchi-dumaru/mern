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
brandRouter.post(
  "/",
  (req, res, next) => {
    console.log("POST /brand hit");
    next();
  },
  auth([userRoles.ADMIN]),
  uploader().single("logo"),
  bodyValidator(BrandDataDTO),
  brandCtrl.createBrand
);

brandRouter.get("/", brandCtrl.listAllBrand);
brandRouter.get("/:id", brandCtrl.viewBrandDetailById);
brandRouter.get("/:slug/by-slug", brandCtrl.viewBrandDetailBySlug);
brandRouter.put("/:id", brandCtrl.updateBrandById);
brandRouter.delete("/:id", brandCtrl.deleteBrandById);

module.exports = brandRouter;
