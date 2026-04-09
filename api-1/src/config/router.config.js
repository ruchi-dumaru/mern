const router = require("express").Router();
const authRouter = require("../app/auth/auth.router");
const frontRouter = require("../app/front/front.router");
const bannerRouter = require("../app/banners/banner.router");
const brandRouter = require("../app/brands/brand.router");
const categoryRouter = require("../app/category/category.router");
const productRouter=require("../app/products/product.router")

//app
//endpoint/url/req/routing/url

/**** Application router mount ****/
router.use("/auth", authRouter);
router.use("/banner", bannerRouter);
router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/front", frontRouter);
module.exports = router;
