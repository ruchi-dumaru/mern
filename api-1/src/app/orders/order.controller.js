const { AppConfig } = require("../../config/config");
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
          status: req.query.status.toLowerCase(),
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
      if (req.loggedInUser.role === userRoles.CUSTOMER) {
        filter = {
          ...filter,
          buyer: req.loggedInUser._id,
        };
      } else if (req.loggedInUser.role === userRoles.SELLER) {
        filter = {
          ...filter,
          seller: req.loggedInUser._id,
        };
      }

      const { data } = await orderDetailsSvc.getAllRowsByFilter(filter);
      res.json({
        data: data,
        message: "Your order Detail",
        status: "ORDER_DETAIL",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async initializeKhaltiPayment(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser;
      const orderDetail = await orderService.getSingleRowByFilter({
        buyer: loggedInUser._id,
        orderCode: req.params.orderCode,
      });
      if (!orderDetail) {
        throw {
          code: 404,
          message: "Order not found",
          status: "ORDER_NOT_FOUND",
        };
      }

      if (!AppConfig.khaltiSecretKey || !AppConfig.khaltiBaseUrl) {
        throw {
          code: 500,
          message: "Khalti configuration is missing",
          status: "KHALTI_CONFIG_ERR",
        };
      }

      if (orderDetail.isPaid) {
        throw {
          code: 409,
          message: "Order is already paid",
          status: "ORDER_ALREADY_PAID",
        };
      }

      const khaltiResponse = await fetch(
        `${AppConfig.khaltiBaseUrl}epayment/initiate/`,
        {
          method: "POST",
          headers: {
            Authorization: `Key ${AppConfig.khaltiSecretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            return_url: `${AppConfig.frontendUrl}/khalti-success`,
            website_url: `${AppConfig.frontendUrl}`,
            amount: Math.round(orderDetail.total),
            purchase_order_id: orderDetail.orderCode,
            purchase_order_name: "Nexsora-Commerce-Cart-Payment",
            customer_info: {
              name: loggedInUser.name || "Test User",
              email: loggedInUser.email || "test@example.com",
              phone: loggedInUser.phone || "9800000000",
            },
          }),
        },
      );

      let response = await khaltiResponse.json();
      if (!khaltiResponse.ok) {
        throw {
          code: 502,
          message: "Khalti payment initialization failed",
          status: "KHALTI_INIT_ERR",
          detail: { orderCode: orderDetail.orderCode, khalti: response },
        };
      }
      if (!response.pidx || !response.payment_url) {
        throw {
          code: 502,
          message: "Khalti returned an incomplete payment response",
          status: "KHALTI_INIT_RESPONSE_ERR",
          detail: { orderCode: orderDetail.orderCode, khalti: response },
        };
      }

      res.json({
        data: response,
        orderId: orderDetail._id,
        orderCode: orderDetail.orderCode,
        pidx: response.pidx,
        paymentUrl: response.payment_url,
        message: "Khalti payment initialized successfully",
        status: "PAY_WITH_KHALTI",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async verifyKhaltiPayment(req, res, next) {
    try {
      const { pidx } = req.body;
      const order = await orderService.getSingleRowByFilter({
        buyer: req.loggedInUser._id,
        orderCode: req.params.orderCode,
      });

      if (!order) {
        throw {
          code: 404,
          message: "Order not found",
          status: "ORDER_NOT_FOUND",
        };
      }
      if (order.isPaid) {
        throw {
          code: 409,
          message: "Order payment has already been processed",
          status: "PAYMENT_ALREADY_PROCESSED",
        };
      }

      if (!AppConfig.khaltiSecretKey || !AppConfig.khaltiBaseUrl) {
        throw {
          code: 500,
          message: "Khalti configuration is missing",
          status: "KHALTI_CONFIG_ERR",
        };
      }

      const khaltiResponse = await fetch(
        `${AppConfig.khaltiBaseUrl}epayment/lookup/`,
        {
          method: "POST",
          headers: {
            Authorization: `Key ${AppConfig.khaltiSecretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pidx }),
        },
      );
      const payment = await khaltiResponse.json();

      if (!khaltiResponse.ok) {
        throw {
          code: 502,
          message: "Khalti payment verification failed",
          status: "KHALTI_VERIFY_ERR",
          detail: payment,
        };
      }
      if (payment.purchase_order_id !== order.orderCode) {
        throw {
          code: 422,
          message: "Payment does not belong to this order",
          status: "PAYMENT_ORDER_MISMATCH",
        };
      }
      if (Number(payment.total_amount) !== Math.round(order.total)) {
        throw {
          code: 422,
          message: "Payment amount does not match the order",
          status: "PAYMENT_AMOUNT_MISMATCH",
          detail: {
            expected: Math.round(order.total),
            received: payment.total_amount,
          },
        };
      }
      if (String(payment.status).toLowerCase() !== "completed") {
        throw {
          code: 422,
          message: `Payment is ${payment.status || "not completed"}`,
          status: "PAYMENT_NOT_COMPLETED",
          detail: payment,
        };
      }

      const updatedOrder = await orderService.markKhaltiPaymentPaid(
        order._id,
        pidx,
        payment,
      );
      if (!updatedOrder) {
        throw {
          code: 409,
          message: "Payment has already been processed",
          status: "PAYMENT_ALREADY_PROCESSED",
        };
      }

      await orderDetailsSvc.updateOrderDetailsByFilter(
        { order: updatedOrder._id, status: OrderStatus.CONFIRMED },
        {
          _id: { $in: updatedOrder.orderDetailIds },
          buyer: req.loggedInUser._id,
          order: null,
        },
      );

      res.json({
        data: updatedOrder,
        orderId: updatedOrder._id,
        orderCode: updatedOrder.orderCode,
        paymentStatus: payment.status,
        orderStatus: updatedOrder.status,
        amount: payment.total_amount,
        pidx,
        message: "Payment verified successfully",
        status: "PAYMENT_VERIFIED",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const OrderCtrl = new OrderController();
module.exports = OrderCtrl;
