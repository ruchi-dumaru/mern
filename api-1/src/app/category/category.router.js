const categoryRouter = require("express").Router();
const categoryCtrl = require("./category.controller");

//category route mount
categoryRouter.post("/", categoryCtrl.createCategory);
categoryRouter.get("/", categoryCtrl.listAllCategories);
categoryRouter.get("/:id", categoryCtrl.viewCategoryDetailById);
categoryRouter.get("/:slug/by-slug", categoryCtrl.viewCategoryDetailBySlug);
categoryRouter.put("/:id", categoryCtrl.updateCategoryById);
categoryRouter.delete("/:id", categoryCtrl.deleteCategoryById);

module.exports = categoryRouter;
