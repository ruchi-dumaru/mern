const bcrypt = require("bcryptjs");
const { Status } = require("../../config/constant.config");
const { generateRandomString, dateCreate } = require("../../utilities/helper");
const userModel = require("./user.model");
const cloudinarySvc = require("../../service/cloudinary.service");

//we write this code here instead of auth.controller as we have to register user in multiple places and we
// can easily call this function and register user
class userService {
  async transformDataToUser(req) {
    try {
      const data = req.body;
      //logic
      //db store

      //

      data.password = bcrypt.hashSync(data.password, 12);

      if (!req.file) {
        throw {
          code: 400,
          detail: { image: "Image required" },
          message: "Validation failed",
          status: "VALIDATEION_ERR",
        };
      }

      data.image = await cloudinarySvc.singleFileUpload(req.file.path, "users"); // response of cloudinary is added to data obj

      data.status = Status.INACTIVE;

      data.activationToken = generateRandomString();

      data.expiry = dateCreate(new Date(), 1);

      //data store  in db
      //email for activation

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeUser(data) {
    try {
      const userObj = new userModel(data);
      return await userObj.save();
    } catch (exception) {
      throw exception;
    }
  }

  async transformUserForUpdate(req, oldUser) {
    try {
      const data = req.body;
      if (req.file) {
        data.image = await cloudinarySvc.singleFileUpload(
          req.file.path,
          "users",
        );
      } else {
        data.image = oldUser.image;
      }

      data.updatedBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  //query to get data from database

  async getSingleRowByFilter(filter) {
    try {
      const userDetail = await userModel.findOne(filter);
      // console.log('getSingleRowByFilter:',userDetail)
      return userDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      const userDetail = await userModel.findOneAndUpdate(
        filter,
        { $set: data },
        { returnDocument: "after" },
      );
      return this.getUserProfile(userDetail);
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, pagination) {
    try {
      let skip = (pagination.page - 1) * pagination.limit;

      const data = await userModel
        .find(filter)
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
        ])
        .sort({ createdAt: "desc" })
        .limit(pagination.limit)
        .skip(skip);

      const total = await userModel.countDocuments(filter);

      console.log("getwaladata:", data);
      return {
        //password prevented from public share
        data: data.map((userInfo) => this.getUserProfile(userInfo)),
        pagination: {
          ...pagination,
          total: total,
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSingleRowByFilter(filter) {
    try {
      return await userModel.findOneAndDelete(filter);
    } catch (exception) {
      throw exception;
    }
  }

  getUserProfile(userObj) {
    return {
      _id: userObj._id ?? "",
      name: userObj.name ?? "",
      email: userObj.email ?? "",
      role: userObj.role ?? "",
      image: userObj.image ?? "",
      address: userObj.address ?? "",
      phone: userObj.phone ?? "",
      dob: userObj.dob ?? "",
      gender: userObj.gender ?? "",
      status: userObj.status ?? "",
    };
  }
}

const userScv = new userService();
module.exports = userScv;
