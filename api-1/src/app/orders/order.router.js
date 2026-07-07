const auth = require("../../middleware/auth.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const orderCtrl=require("../orders/order.controller")
const orderRouter= require("express").Router()
const Joi=require("joi");

const orderCheckoutDTO=Joi.object({
  
    "cartId":Joi.array().items(Joi.string().required()).required(),
    "voucherCouponCode":Joi.string().allow(null,'').default(null),
    "shippingAddress":Joi.string().allow(null,'').default(null)

})
//checkout
orderRouter.post("/checkout",auth(),bodyValidator(orderCheckoutDTO),orderCtrl.placeOrder);
orderRouter.get('/',auth(),orderCtrl.getMyOrders)
orderRouter.get('/:id',auth(),orderCtrl.getOrderDetail)
orderRouter.get('/:orderCode/init-payment',auth(),orderCtrl.initializeKhaltiPayment)
module.exports=orderRouter;

//  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTQxOWE4MjhmODU5NWYzMDRkOTQ0MzAiLCJ0eXAiOiJCZWFyZXIiLCJpYXQiOjE3ODM0MzQ1NDgsImV4cCI6MTc4MzUyMDk0OH0.x23YYUxsB7sKm1Sai_UPnNrjlbX8Efg4nmvi0JUTOAs",

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTQxOWE4MjhmODU5NWYzMDRkOTQ0MzAiLCJ0eXAiOiJCZWFyZXIiLCJpYXQiOjE3ODM0MzQ1NDgsImV4cCI6MTc4MzUyMDk0OH0.x23YYUxsB7sKm1Sai_UPnNrjlbX8Efg4nmvi0JUTOAs

