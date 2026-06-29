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
        .sort({ createdAt: "desc" });
console.log("Data:",data)
      return data;
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new BrandService();



   

