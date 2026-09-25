const mongoose = require("mongoose");
const { OrderStatus } = require("../../config/constant.config");

const OrderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: true,
      unique: true,
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    serviceCharge: Number,
    deliveryCharge: Number,

    total: {
      type: Number,
      required: true,
    },
    isPaid: Boolean,
    paymentPidx: { type: String, default: null, unique: true, sparse: true },
    paymentStatus: { type: String, default: null },
    paymentTransactionId: { type: String, default: null },
    paymentAmount: { type: Number, default: null },
    paymentMethod: { type: String, default: null },
    paymentCompletedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    orderDetailIds: [{ type: mongoose.Types.ObjectId, ref: "OrderDetail" }],
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  },
);

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
