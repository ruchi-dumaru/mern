const productRouter = require("express").Router();
const { userRoles } = require("../../config/constant.config");
const auth = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const productCtrl = require("./product.controller");
const { ProductDataDTO } = require("./product.request");
const multer=require('multer');



//CRUD
//public ra backend excess route for listing
productRouter.get("/", auth([userRoles.ADMIN]),productCtrl.listAllProducts);
productRouter.get("/front-list",productCtrl.frontlistAllProducts);



//private route
// productRouter.post("/",auth([userRoles.ADMIN,userRoles.SELLER],
//   console.log("Product Hit")
// ),uploader().array("images"),bodyValidator(ProductDataDTO),productCtrl.createProduct
// );
productRouter.post(
  "/",

  (req, res, next) => {
    console.log("Product Hit");
    next();
  },

  auth([userRoles.ADMIN, userRoles.SELLER]),

  uploader().array("images"),

  bodyValidator(ProductDataDTO),

  productCtrl.createProduct
);

productRouter.get("/:id",auth([userRoles.ADMIN,userRoles.SELLER]), productCtrl.viewProductDetailById);
productRouter.get("/:slug/by-slug", productCtrl.viewProductDetailBySlug);
productRouter.put("/:id",auth([userRoles.ADMIN,userRoles.SELLER]),uploader().array("images"),bodyValidator(ProductDataDTO), productCtrl.updateProductById);
productRouter.delete("/:id", auth([userRoles.ADMIN,userRoles.SELLER]),productCtrl.deleteProductById);

module.exports = productRouter;



  