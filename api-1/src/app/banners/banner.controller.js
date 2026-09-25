const bannerService = require("./banner.service");

class bannerController {
  createBanner = async (req, res, next) => {
    try {
      const banner = await bannerService.store(
        await bannerService.transformForCreate(req),
      );
      res
        .status(201)
        .json({ data: banner, message: "Banner created", status: "OK" });
    } catch (exception) {
      next(exception);
    }
  };

  listAllBanner = async (req, res, next) => {
    try {
      const filter = req.query.search
        ? { title: new RegExp(req.query.search, "i") }
        : {};
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 20;
      const result = await bannerService.list(filter, page, limit);
      res.json({
        data: result.data,
        message: "All banner List",
        status: "OK",
        meta: { pagination: result.pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  listSpecificBannerById = async (req, res, next) => {
    try {
      const banner = await bannerService.findById(req.params.id);
      if (!banner)
        throw { code: 404, message: "Banner not found", status: "NOT_FOUND" };
      res.json({ data: banner, message: "Banner Detail", status: "OK" });
    } catch (exception) {
      next(exception);
    }
  };

  updateBannerById = async (req, res, next) => {
    try {
      const existing = await bannerService.findById(req.params.id);
      if (!existing)
        throw { code: 404, message: "Banner not found", status: "NOT_FOUND" };
      const banner = await bannerService.updateById(
        req.params.id,
        await bannerService.transformForUpdate(req, existing),
      );
      res.json({ data: banner, message: "Banner updated", status: "OK" });
    } catch (exception) {
      next(exception);
    }
  };

  deleteBannerById = async (req, res, next) => {
    try {
      const banner = await bannerService.deleteById(req.params.id);
      if (!banner)
        throw { code: 404, message: "Banner not found", status: "NOT_FOUND" };
      res.json({ data: null, message: "Banner deleted", status: "OK" });
    } catch (exception) {
      next(exception);
    }
  };
}

const bannerCtrl = new bannerController();

module.exports = bannerCtrl;
