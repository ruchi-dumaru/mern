const brandService = require("./brand.service");

class brandController {
  async createBrand(req, res, next) {
    try {
      const data = await brandService.transformToBrand(req);
      console.log(data);
      const brand = await brandService.storeBrand(data);
      console.log("brandCtrl:", brand);

      res.status(201).json({
        data: brand,
        message: "brand created",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  listAllBrand = (req, res) => {
    res.json({
      data: null,
      message: "All brand List",
      status: "OK",
    });
  };

  viewBrandDetailById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `Brand detail of ${params.id}`,
      status: "OK",
    });
  };

  viewBrandDetailBySlug = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `Brand detail of ${params.slug}`,
      status: "OK",
    });
  };

  updateBrandById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `Brand update for ${params.id}`,
      status: "OK",
    });
  };

  deleteBrandById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `Brand deleted for ${params.id}`,
      status: "OK",
    });
  };
}

const brandCtrl = new brandController();

module.exports = brandCtrl;
