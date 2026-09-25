const mongoose = require("mongoose");
const { Status } = require("../../config/constant.config");

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    link: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    image: { id: String, optimizedUrl: String, originalUrl: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Banner", BannerSchema);
