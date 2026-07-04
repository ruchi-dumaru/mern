//_id,name,slug,category[],brand,description,price,discount(%),afterDiscountAmount,seller,isFeatured,images,status,createdBy,updatedBy,createdAt,updatedAt

const mongoose = require("mongoose");
const Status = require("../../config/constant.config");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 255,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },

    category: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        default: null,
      },
    ],

    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isFeatured: Boolean,
    images:[{
      id: String,
      optimizedUrl: String,
      originalUrl: String,
    }] ,

    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 10000,
    },
    discount: {
      type: Number,
      min: 0,
      max: 90,
      default: 0,
    },
    afterDiscountAmount: {
      type: Number,
      required: true,
    },
    seller:{
      type:mongoose.Types.ObjectId,
      ref:"User",
required:true
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
  },
  {
    timestamps: true, //createdAt,updatedAt
    autoCreate: true,
    autoIndex: true,
  },
);

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
