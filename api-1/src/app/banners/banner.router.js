const bannerRouter = require("express").Router();
const bannerCtrl = require("./banner.controller");
const { userRoles } = require("../../config/constant.config");
const auth = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/uploader.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const { BannerDataDTO } = require("./banner.request");

//banner routes mount
bannerRouter.post(
  "/",
  auth([userRoles.Admin]),
  uploader().single("image"),
  bodyValidator(BannerDataDTO),
  bannerCtrl.createBanner,
);
bannerRouter.get("/", auth([userRoles.Admin]), bannerCtrl.listAllBanner);
bannerRouter.get(
  "/:id",
  auth([userRoles.Admin]),
  bannerCtrl.listSpecificBannerById,
);
bannerRouter.put(
  "/:id",
  auth([userRoles.Admin]),
  uploader().single("image"),
  bodyValidator(BannerDataDTO),
  bannerCtrl.updateBannerById,
);
bannerRouter.delete(
  "/:id",
  auth([userRoles.Admin]),
  bannerCtrl.deleteBannerById,
);

module.exports = bannerRouter;
