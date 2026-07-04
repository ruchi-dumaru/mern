const router = require("express").Router();
const authRouter = require("../app/auth/auth.router");
const frontRouter = require("../app/front/front.router");
const bannerRouter = require("../app/banners/banner.router");
const brandRouter = require("../app/brands/brand.router");
const categoryRouter = require("../app/category/category.router");
const productRouter=require("../app/product/product.router");
const userRouter = require("../app/user/user.router");

//app
//endpoint/url/req/routing/url

/**** Application router mount ****/
router.use("/auth", authRouter);
router.use("/banner", bannerRouter);
router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/front", frontRouter);
router.use('/user',userRouter);

module.exports = router;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTQxOWE4MjhmODU5NWYzMDRkOTQ0MzAiLCJ0eXAiOiJCZWFyZXIiLCJpYXQiOjE3ODMxNDAyMTgsImV4cCI6MTc4MzIyNjYxOH0.N81vQpJHOTntXbChcwE4lYG0vj8BQUQMml-iDg9SEos