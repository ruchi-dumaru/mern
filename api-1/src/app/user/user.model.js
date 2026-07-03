const mongoose = require("mongoose");
const { userRoles, gender, Status } = require("../../config/constant.config");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 4,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.CUSTOMER,
    },
    image: {
      id: String,
      optimizedUrl: String,
      originalUrl: String,
    },
    address: String,
    phone: String,
    dob: Date,
    gender: {
      type: String,
      enum: Object.values(gender),
    },
    activationToken: String,
    expiry: Date,
    forgetToken: String,
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
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

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

//now we have to store data in db by using tool called model so we will be using userModel
