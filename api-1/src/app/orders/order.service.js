const { OrderStatus } = require("../../config/constant.config");
const OrderModel = require("./order.model");

class OrderService {
  async getNewOrderCode() {
    try {
      const count = await OrderModel.countDocuments();
      let code = `${count + 1}`.padStart(6, "0");
      return "ORDER-" + code;
    } catch (exception) {
      throw exception;
    }
  }

  async getCalculation(cartDetail) {
    let pricingDetail = {
      subtotal: 0,
      tax: 0,
      serviceCharge: 0,
      deliveryCharge: 0,
      total: 0,
    };

    let orderDetailSave = [];

    cartDetail.map((orderDetail) => {
      pricingDetail.subtotal +=
        orderDetail.product.afterDiscountAmount * orderDetail.quantity;
      orderDetail.subtotal =
        orderDetail.product.afterDiscountAmount * orderDetail.quantity;
      orderDetail.price = orderDetail.product.afterDiscountAmount;
      orderDetail.tax = orderDetail.subtotal * 0.13;
      orderDetail.total = orderDetail.subtotal + orderDetail.tax;

      //orderDetail store
      orderDetailSave.push(orderDetail.save());
    });

    //orderDetail store
    await Promise.allSettled(orderDetailSave);

    pricingDetail.serviceCharge = pricingDetail.subtotal * 0.1;

    pricingDetail.deliveryCharge = 10000;
    pricingDetail.tax =
      (pricingDetail.subtotal +
        pricingDetail.serviceCharge +
        pricingDetail.deliveryCharge) *
      0.13;

    pricingDetail.total =
      pricingDetail.subtotal +
      pricingDetail.serviceCharge +
      pricingDetail.deliveryCharge +
      pricingDetail.tax;

    pricingDetail.total = Math.round(pricingDetail.total);

    return pricingDetail;
  }

  async prepareOrder(buyerId, cart) {
    try {
      const pricing = await this.getCalculation(cart);
      let order = {
        orderCode: await this.getNewOrderCode(),
        buyer: buyerId,
        orderDetailIds: cart.map((orderDetail) => orderDetail._id),
        ...pricing,
        isPaid: false,
        status: OrderStatus.PENDING,
        createdBy: buyerId,
      };

      return order;
    } catch (exception) {
      throw exception;
    }
  }

  async storeOrder(data) {
    try {
      const order = new OrderModel(data);
      return await order.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllOrdersByFilter(filter) {
    try {
      //implement pagination
      const data = await OrderModel.find(filter)
        .populate("buyer", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])
        .sort({ createdAt: "desc" });

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await OrderModel.findOne(filter).populate("buyer", [
        "_id",
        "name",
        "email",
        "address",
        "phone",
        "dob",
        "status",
        "gender",
        "image",
        "role",
      ]);
      console.log(data);
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async markKhaltiPaymentPaid(orderId, pidx, payment) {
    return OrderModel.findOneAndUpdate(
      { _id: orderId, isPaid: { $ne: true }, paymentPidx: { $ne: pidx } },
      {
        $set: {
          isPaid: true,
          status: OrderStatus.VERIFIED,
          paymentPidx: pidx,
          paymentStatus: payment.status,
          paymentTransactionId: payment.transaction_id || null,
          paymentAmount: payment.total_amount,
          paymentMethod: "khalti",
          paymentCompletedAt: new Date(),
        },
      },
      { new: true },
    );
  }
}

module.exports = new OrderService();
