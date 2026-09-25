const auth = require("../../middleware/auth.middleware");
const bodyValidator = require("../../middleware/validator.middleware");
const orderCtrl = require("../orders/order.controller");
const orderRouter = require("express").Router();
const Joi = require("joi");

const orderCheckoutDTO = Joi.object({
  cartId: Joi.array().items(Joi.string().required()).required(),
  voucherCouponCode: Joi.string().allow(null, "").default(null),
  shippingAddress: Joi.string().allow(null, "").default(null),
});
//checkout
orderRouter.post(
  "/checkout",
  auth(),
  bodyValidator(orderCheckoutDTO),
  orderCtrl.placeOrder,
);
orderRouter.get("/", auth(), orderCtrl.getMyOrders);
orderRouter.get("/:id", auth(), orderCtrl.getOrderDetail);
orderRouter.get(
  "/:orderCode/init-khalti",
  auth(),
  orderCtrl.initializeKhaltiPayment,
);
orderRouter.post(
  "/:orderCode/verify-khalti",
  auth(),
  bodyValidator(
    Joi.object({
      pidx: Joi.string().required(),
    }),
  ),
  orderCtrl.verifyKhaltiPayment,
);
module.exports = orderRouter;
