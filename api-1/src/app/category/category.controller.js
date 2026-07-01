const { Status } = require("../../config/constant.config");
const categoryService = require("./category.service");

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const data = await categoryService.transformToCategory(req);

      const category = await categoryService.storeCategory(data);
      // console.log("categoryCtrl:", category);

      res.status(201).json({
        data: category,
        message: "category created",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllCategories(req, res, next) {
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

      const { data, pagination } = await categoryService.getAllRowsByFilter(
        filter,
        { page, limit },
      );

      res.json({
        data: data,
        message: "All category List",
        status: "OK",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async frontlistAllCategories(req, res, next) {
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

        const { data, pagination } = await categoryService.getAllRowsByFilter(
          filter,
          { page, limit },
        );

        res.json({
          data: data,
          message: "All category List",
          status: "OK",
          meta: { pagination },
        });
      
    } catch (exception) {
      next(exception);
    }
  }



  async viewCategoryDetailById(req, res, next) {
    try {
      const id = req.params.id;
      const detail = await categoryService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Category not found", status: "NOT_FOUND" };
      }
      res.json({
        data: detail,
        message: "Category Detail",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async viewCategoryDetailBySlug(req, res, next) {
    try {
      const filter = {
        status: Status.ACTIVE,
        slug: req.params.slug,
      };
      let detail = await categoryService.getSingleRowByFilter(filter);

      if (!detail) {
        throw { code: 404, message: "Category not found", status: "NOT_FOUND" };
      }
      res.json({
        detail: {
          category: detail,
          product: null,
        },
        message: "Category detail by slug",
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

  async updateCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await categoryService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Category not found", status: "NOT_FOUND" };
      }

      const data = await categoryService.transformToCategoryForUpdate(req, detail);

      detail = await categoryService.updateSingleRowByCategory({ _id: id }, data);

      res.json({
        data: detail,
        message: "Category updated",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await categoryService.getSingleRowByFilter({
        _id: id,
      });

      if (!detail) {
        throw { code: 404, message: "Category not found", status: "NOT_FOUND" };
      }

      await categoryService.deleteSingleRowByFilter({ _id: id });
      res.json({
        data: null,
        message: "Category deleted",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }
}
const categoryCtrl = new CategoryController();

module.exports = categoryCtrl;
