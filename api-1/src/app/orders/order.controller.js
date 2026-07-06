const { OrderStatus, userRoles } = require("../../config/constant.config");
const orderDetailsSvc = require("../order-details/order-details.service");
const orderService = require("./order.service");

class OrderController {
  async placeOrder(req, res, next) {
    try {
      console.log("Hiiiiii");
      const { cartId, voucherCouponCode, shippingAddress } = req.body;

      const loggedInUser = req.loggedInUser;

      //order and order functionality
      const { data } = await orderDetailsSvc.getAllRowsByFilter({
        _id: { $in: cartId },
        order: { $eq: null },
        buyer: loggedInUser._id,
        status: OrderStatus.PENDING,
      });

      console.log("place order ko data:", data);

      //Cart items =>order
      let orderData = await orderService.prepareOrder(loggedInUser._id, data);
      if (cartId.length !== data.length) {
        throw {
          code: 422,
          message: "All cart items doesnot exists in your collection",
          status: "CART_NOT_FOUND_ERR",
        };
      }

      console.log("orderdata", orderData);

      //cart items =>order
      // let orderData = await orderService.prepareOrder(loggedInUser._id, data);

      orderData = await orderService.storeOrder(orderData);

      await orderDetailsSvc.updateOrderDetailsByFilter(
        {
          order: orderData._id,
          status: OrderStatus.CONFIRMED,
        },
        { _id: { $in: cartId } },
      );

      //TODO notify
      // your order has been placed successfully
      //pls click on link below to activate verify or cancle order email ma btn halne alike acc registration
      // 2 link order update status cancle
      //order update ani confirm hunxa
      console.log("final orderData:", orderData);
      res.json({
        data: orderData,
        message: "Your order has been placed successfully",
        status: "ORDER_PLACED",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getMyOrders(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser;
      let filter = {};
      if (loggedInUser.role === userRoles.CUSTOMER) {
        filter = {
          ...filter,
          buyer: loggedInUser._id,
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.toLowerCase(),
        };
      }

      const data = await orderService.getAllOrdersByFilter(filter);
      res.json({
        data: data,
        message: "Order List",
        status: "ORDER_LIST",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getOrderDetail(req, res, next) {
    try {
      let filter = {
        order: req.params.id,
      };
      if (req.loggedInUser.role !== userRoles.CUSTOMER) {
        filter = {
          ...filter,
          buyer: req.loggedInUser._id,
        };
      } else if (req.loggedInUser.role !== userRoles.SELLER) {
        filter = {
          ...filter,
          seller: req.loggedInUser._id,
        };
      }

      const{data} =await orderDetailsSvc.getAllRowsByFilter(filter)
      res.json({
        data:data,
        message:"Your order Detail",
        status:"ORDER_DETAIL"
      })
    } catch (exception) {
      next(exception);
    }
  }
}

const OrderCtrl = new OrderController();
module.exports = OrderCtrl;
