const { default: slugify } = require("slugify");

const cloudinarySvc = require("../../service/cloudinary.service");
const BrandModel = require("./brand.model");

class BrandService {
  async transformToBrand(req) {
    try {
      const data = req.body;
      if (req.file) {
        data.logo = await cloudinarySvc.singleFileUpload(
          req.file.path,
          "brands",
        );
      }
      //slug:FE ma url banauna use garnea parameter
      data.slug = slugify(data.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      data.createdBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transformToBrandForUpdate(req, brand) {
    try {
      const data = req.body;
      if (req.file) {
        data.logo = await cloudinarySvc.singleFileUpload(
          req.file.path,
          "brands",
        );
      } else {
        data.logo = brand.logo;
      }

      data.slug = slugify(data.name, { lower: true, remove: /[*+~.()'"!:@]/g });

      data.updatedBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeBrand(data) {
    try {
      const brand = new BrandModel(data);
      return brand.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, pagination) {
    try {
      let skip = (pagination.page - 1) * pagination.limit;

      const data = await BrandModel.find(filter)
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

      const total = await BrandModel.countDocuments(filter);
      console.log("Query completed");
      console.log(data);
      console.log("getwaladata:", data);
      return {
        data,
        pagination: {
          ...pagination,
          total: total,
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await BrandModel.findOne(filter)
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
      console.log("Query completed");
      console.log(data);
      return data;
    } catch (exception) {
      next(exception);
    }
  }

  async updateSingleRowByBrand(filter, data) {
    try {
      const detail = await BrandModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      return detail;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSingleRowByFilter(filter) {
    try {
      const detail = await BrandModel.findOneAndDelete(filter);
      return detail;
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new BrandService();
