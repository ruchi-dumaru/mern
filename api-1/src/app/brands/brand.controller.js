const { Status } = require("../../config/constant.config");
const brandService = require("./brand.service");

class brandController {
  async createBrand(req, res, next) {
    try {
      const data = await brandService.transformToBrand(req);

      const brand = await brandService.storeBrand(data);
      // console.log("brandCtrl:", brand);

      res.status(201).json({
        data: brand,
        message: "brand created",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllBrand(req, res, next) {
    try {
      //active inactive both status search
      let filter = {};

      if (req.query.search) {
        filter = {
          name: new RegExp(req.query.search, "i"),
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      //pagination
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 20;

      const { data, pagination } = await brandService.getAllRowsByFilter(
        filter,
        { page, limit },
      );

      res.json({
        data: data,
        message: "All brand List",
        status: "OK",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async frontlistAllBrand(req, res, next) {
    try {
      //only active  status search allowed
      let filter = {
        status: Status.ACTIVE,
      };

      if (req.query.search) {
        filter = {
          ...filter,
          name: new RegExp(req.query.search, "i"),
        };
      }

      if (+req.query.isFeatured === 1) {
        filter = {
          ...filter,
          isFeatured: true,
        };
      } else if (+req.query.isFeatured === 1) {
        filter = {
          ...filter,
          isFeatured: false,
        };
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 20;

        const { data, pagination } = await brandService.getAllRowsByFilter(
          filter,
          { page, limit },
        );

        res.json({
          data: data,
          message: "All brand List",
          status: "OK",
          meta: { pagination },
        });
      }
    } catch (exception) {
      next(exception);
    }
  }

  async viewBrandDetailById(req, res, next) {
    try {
      const id = req.params.id;
      const detail = await brandService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Brand not found", status: "NOT_FOUND" };
      }
      res.json({
        data: detail,
        message: "Brand Detail",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async viewBrandDetailBySlug(req, res, next) {
    try {
      const filter = {
        status: Status.ACTIVE,
        slug: req.params.slug,
      };
      let detail = await brandService.getSingleRowByFilter(filter);

      if (!detail) {
        throw { code: 404, message: "Brand not found", status: "NOT_FOUND" };
      }
      res.json({
        detail: {
          brand: detail,
          product: null,
        },
        message: "Brand detail by slug",
        status: "OK",
        meta: {
          pagination: {
            page: 1,
            limit: 20,
            total: 0,
          },
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async updateBrandById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await brandService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Brand not found", status: "NOT_FOUND" };
      }

      const data = await brandService.transformToBrandForUpdate(req, detail);

      detail = await brandService.updateSingleRowByBrand({ _id: id }, data);

      res.json({
        data: detail,
        message: "Brand updated",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteBrandById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await brandService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Brand not found", status: "NOT_FOUND" };
      }

      await brandService.deleteSingleRowByFilter({ _id: id });
      res.json({
        data: null,
        message: "Brand deleted",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }
}
const brandCtrl = new brandController();

module.exports = brandCtrl;
