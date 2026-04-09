const brandRouter = require("express").Router();
const brandCtrl = require("./brand.controller");

//brand route mount
brandRouter.post("/", brandCtrl.createBrand);
brandRouter.get("/", brandCtrl.listAllBrand);
brandRouter.get("/:id", brandCtrl.viewBrandDetailById);
brandRouter.get("/:slug/by-slug", brandCtrl.viewBrandDetailBySlug);
brandRouter.put("/:id", brandCtrl.updateBrandById);
brandRouter.delete("/:id", brandCtrl.deleteBrandById);

module.exports = brandRouter;
