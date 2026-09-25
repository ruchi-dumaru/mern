const cloudinarySvc = require("../../service/cloudinary.service");
const BannerModel = require("./banner.model");

class BannerService {
  async transformForCreate(req) {
    const data = { ...req.body };
    if (!req.file)
      throw {
        code: 422,
        message: "Banner image is required",
        status: "VALIDATION_ERR",
      };
    data.image = await cloudinarySvc.singleFileUpload(req.file.path, "banners");
    data.createdBy = req.loggedInUser._id;
    return data;
  }

  async transformForUpdate(req, banner) {
    const data = { ...req.body, updatedBy: req.loggedInUser._id };
    data.image = req.file
      ? await cloudinarySvc.singleFileUpload(req.file.path, "banners")
      : banner.image;
    return data;
  }

  store(data) {
    return new BannerModel(data).save();
  }

  async list(filter, page, limit) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      BannerModel.find(filter)
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit),
      BannerModel.countDocuments(filter),
    ]);
    return { data, pagination: { page, limit, total } };
  }

  findById(id) {
    return BannerModel.findById(id);
  }
  updateById(id, data) {
    return BannerModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );
  }
  deleteById(id) {
    return BannerModel.findByIdAndDelete(id);
  }
}

module.exports = new BannerService();
