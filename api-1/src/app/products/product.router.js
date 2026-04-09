const productRouter = require("express").Router();
const productCtrl = require("./product.controller");

//product route mount
productRouter.post("/", productCtrl.createproduct);
productRouter.get("/", productCtrl.listAllproduct);
productRouter.get("/:id", productCtrl.viewproductDetailById);
productRouter.get("/:slug/by-slug", productCtrl.viewproductDetailBySlug);
productRouter.put("/:id", productCtrl.updateproductById);
productRouter.delete("/:id", productCtrl.deleteproductById);

module.exports = productRouter;
