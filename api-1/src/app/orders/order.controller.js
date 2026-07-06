const orderDetailsSvc = require("../order-details/order-details.service");

class OrderController {
  async placeOrder(req, res, next) {
    try {
      const { cartId, voucherCouponCode, shippingAddress }=req.body;

      const loggedInUser=req.loggedInUser;

      //order and order functionality
      const {data} =await orderDetailsSvc.getAllRowsByFilter({
        _id:{$in:cartId},
        order:{$eq:null},
        buyer:loggedInUser._id,
        stats:OrderStatus.PENDING
      })

      //
      if(cartId.length !== data.length){
  throw{code:422,message:"All cart items doesnot exists in your collection",status:"CART_NOT_FOUND_ERR"}
      }

 //cart items =>order
    } catch (exception) {
      next(exception);
    }
  }
}

module.exports = new OrderController();
