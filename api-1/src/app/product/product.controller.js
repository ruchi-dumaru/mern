const { Status, userRoles } = require("../../config/constant.config");
const productService = require("./product.service");

class ProductController {
  async createProduct(req, res, next) {
    try {
      const data = await productService.transformToProduct(req);

      const product = await productService.storeProduct(data);

      res.status(201).json({
        data: product,
        message: "product created",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllProducts(req, res, next) {
    try {
      //active inactive both status search
      let filter = {};

      if (req.loggedInUser.role === userRoles.SELLER) {
        filter = {
          $or: [
            { seller: req.loggedInUser._id },
            { createdBy: req.loggedInUser._id },
          ],
        };
      }
      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { description: new RegExp(req.query.search, "i") },
          ],
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

      const { data, pagination } = await productService.getAllRowsByFilter(
        filter,
        { page, limit },
      );

      res.json({
        data: data,
        message: "All product List",
        status: "OK",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async frontlistAllProducts(req, res, next) {
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
      } else if (+req.query.isFeatured === 0) {
        filter = {
          ...filter,
          isFeatured: false,
        };
      }
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 20;

      const { data, pagination } = await productService.getAllRowsByFilter(
        filter,
        { page, limit },
      );

      res.json({
        data: data,
        message: "All product List",
        status: "OK",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async viewProductDetailById(req, res, next) {
    try {
      const id = req.params.id;
      const detail = await productService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Product not found", status: "NOT_FOUND" };
      }
      res.json({
        data: detail,
        message: "Product Detail",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async viewProductDetailBySlug(req, res, next) {
    try {
      const filter = {
        status: Status.ACTIVE,
        slug: req.params.slug,
      };
      let detail = await productService.getSingleRowByFilter(filter);

      if (!detail) {
        throw { code: 404, message: "Product not found", status: "NOT_FOUND" };
      }
      res.json({
        detail: {
          product: detail,
          product: null,
        },
        message: "Product detail by slug",
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

  async updateProductById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await productService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Product not found", status: "NOT_FOUND" };
      }

      const data = await productService.transformToProductForUpdate(
        req,
        detail,
      );

      detail = await productService.updateSingleRowByProduct({ _id: id }, data);

      res.json({
        data: detail,
        message: "Product updated",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await productService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Product not found", status: "NOT_FOUND" };
      }

      await productService.deleteSingleRowByFilter({ _id: id });
      res.json({
        data: null,
        message: "Product deleted",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }
}
const productCtrl = new ProductController();

module.exports = productCtrl;
