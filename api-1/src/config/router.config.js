const router=require("express").Router()
const authRouter=require('../app/auth/auth.router');
const frontRouter=require('../app/front/front.router')
//app
//endpoint/url/req/routing/url



/**** Application router mount ****/
router.use('/auth',authRouter);
router.use('/front',frontRouter);
module.exports=router