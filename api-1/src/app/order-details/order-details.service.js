const OrderDetailModel = require("./order-details.model");

class OrderDetailService {
  async getSingleRowByFilter(filter) {
    try {
      const orderDetail = await OrderDetailModel.findOne(filter)
        .populate("order", [
          "_id",
          "orderCode",
          "subtotal",
          "tax",
          "serviceCharge",
          "deliveryCharge",
          "total",
          "isPaid",
          "status",
        ])
        .populate("product", [
          "_id",
          "name",
          "slug",
          "price",
          "discount",
          "afterDiscountAmount",
          "status",
          "images",
          "seller",
        ])
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
        .populate("seller", [
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
        .populate("createdBy", [
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
        .populate("updatedBy", [
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
      return orderDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async addToCart(data) {
    try {
      const orderDetail = new OrderDetailModel(data);
      await orderDetail.save();
      return await this.getSingleRowByFilter({ _id: orderDetail._id });
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new OrderDetailService();
