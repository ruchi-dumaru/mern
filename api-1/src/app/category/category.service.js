const { default: slugify } = require("slugify");

const cloudinarySvc = require("../../service/cloudinary.service");
const CategoryModel = require("./category.model");

class CategoryService {
  async transformToCategory(req) {
    try {
      const data = req.body;
      if (req.file) {
        data.icon = await cloudinarySvc.singleFileUpload(
          req.file.path,
          "categories",
        );
      }
      //slug:FE ma url banauna use garnea parameter
      data.slug = slugify(data.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      data.createdBy = req.loggedInUser._id;

      // validating foregin key:brands , parentId
      if (!data.parentId || data.parentId === "" || data.parentId == "null") {
        data.parentId = null;
      }

      if (!data.brands || data.brands === "" || data.brands == "null") {
        data.brands = null;
      }
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transformToCategoryForUpdate(req, category) {
    try {
      const data = req.body;
      if (req.file) {
        data.icon = await cloudinarySvc.singleFileUpload(
          req.file.path,
          "categories",
        );
      }
      data.icon = category.icon;

      if (!data.parentId || data.parentId === "" || data.parentId == "null") {
        data.parentId = null;
      }

      if (!data.brands || data.brands === "" || data.brands == "null") {
        data.brands = null;
      }

      data.updatedBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeCategory(data) {
    try {
      const category = new CategoryModel(data);
      return category.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, pagination) {
    try {
      let skip = (pagination.page - 1) * pagination.limit;

      const data = await CategoryModel.find(filter)
      .populate('parentId',['_id','name','slug','icon','brands','status'])
      .populate('brands',['_id','name','slug','icon','brands','status'])
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

      const total = await CategoryModel.countDocuments(filter);

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
      const data = await CategoryModel.findOne(filter)
      .populate('parentId',['_id','name','slug','icon','brands','status'])
      .populate('brands',['_id','name','slug','icon','brands','status'])
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

      return data;
    } catch (exception) {
      next(exception);
    }
  }

  async updateSingleRowByCategory(filter, data) {
    try {
      const detail = await CategoryModel.findOneAndUpdate(
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
      const detail = await CategoryModel.findOneAndDelete(filter);
      return detail;
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new CategoryService();
