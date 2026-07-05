const { userRoles } = require("../../config/constant.config");
const bodyValidator = require("../../middleware/validator.middleware");
const OrderDetailRouter=require("express").Router()
const Joi=require("joi");
const orderDetailCtrl = require("./order-details.controller");
const auth = require("../../middleware/auth.middleware");

const CartDTO=Joi.object({
  productId:Joi.string().required(),
  quantity:Joi.number().min(0).required()
})

OrderDetailRouter.post("/add-to-cart",auth([userRoles.ADMIN,userRoles.CUSTOMER]),bodyValidator(CartDTO),orderDetailCtrl.addToCart);

module.exports=OrderDetailRouter