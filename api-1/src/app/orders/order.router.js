const auth = require("../../middleware/auth.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const orderCtrl=require("../orders/order.controller")
const orderRouter= require("express").Router()


const orderCheckoutDTO=Joi.object({
  
    "cartId":Joi.array().items(Joi.string().required()).required(),
    "voucherCouponCode":Joi.string().allow(null,'').default(null),
    "shippingAddress":Joi.string().allow(null,'').default(null)

})
//checkout
orderRouter.post("/checkout",auth(),bodyValidator(orderCheckoutDTO),orderCtrl.placeOrder)
moudle.exports=orderRouter;