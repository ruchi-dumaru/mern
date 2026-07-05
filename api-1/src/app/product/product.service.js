const { default: slugify } = require("slugify");

const cloudinarySvc = require("../../service/cloudinary.service");
const ProductModel = require("./product.model");
const { generateRandomString } = require("../../utilities/helper");

class ProductService {
  async transformToProduct(req) {
    try {
      const data = req.body;

      //directory created for product
      if (req.files) {
        data.images=await cloudinarySvc.multipleFileUpload(req.files,'products')
      }


      //slug:FE ma url banauna use garnea parameter
      data.slug = slugify(data.name+"-"+generateRandomString(10), { lower: true, remove: /[*+~.()'"!:@]/g });
      data.createdBy = req.loggedInUser._id;

      // validating foregin key:brands , category
      if (!data.category || data.category === "" || data.category == "null") {
        data.category = null;
      }

      if (!data.brand || data.brand === "" || data.brand == "null") {
        data.brand = null;
      }

      
      if (!data.seller || data.seller === "" || data.seller == "null") {
        data.seller = req.loggedInUser._id;
      }

      data.price=data.price*100;
      data.afterDiscountAmount=data.price-data.price*data.discount/100;

      return data;
     
    } catch (exception) {
      throw exception;
    }
  }

  async transformToProductForUpdate(req, product) {
    try {
      let images=[];
       const data = req.body;
     if (req.files) {
      images=await cloudinarySvc.multipleFileUpload(req.files,'products')
      }

      data.images=[...images,...product.images]
      data.updatedBy = req.loggedInUser._id;

      // validating foregin key:brands , category
      if (!data.category || data.category === "" || data.category == "null") {
        data.category = null;
      }

      if (!data.brand || data.brand === "" || data.brand == "null") {
        data.brand = null;
      }

      
      if (!data.seller || data.seller === "" || data.seller == "null") {
        data.seller = req.loggedInUser._id;
      }

      data.price=data.price*100;
      data.afterDiscountAmount=data.price-data.price*data.discount/100;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeProduct(data) {
    try {
      const product = new ProductModel(data);
      return product.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, pagination) {
    try {
      let skip = (pagination.page - 1) * pagination.limit;

      const data = await ProductModel.find(filter)
        .populate("category", [
          "_id",
          "name",
          "slug",
          "images",
          "brands",
          "status",
        ])
        .populate("brand", [
          "_id",
          "name",
          "slug",
          "images",
          "brands",
          "status",
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
        ])
        .sort({ createdAt: "desc" })
        .limit(pagination.limit)
        .skip(skip);

      const total = await ProductModel.countDocuments(filter);
      console.log(total)
console.log("data:",data)
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
      const data = await ProductModel.findOne(filter)
       .populate("category", [
          "_id",
          "name",
          "slug",
          "images",
          "brands",
          "status",
        ])
        .populate("brand", [
          "_id",
          "name",
          "slug",
          "images",
          "brands",
          "status",
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
        ])

      return data;
    } catch (exception) {
      next(exception);
    }
  }

  async updateSingleRowByProduct(filter, data) {
    try {
      const detail = await ProductModel.findOneAndUpdate(
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
      const detail = await ProductModel.findOneAndDelete(filter);
      return detail;
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new ProductService();
