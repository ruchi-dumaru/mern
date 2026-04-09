class brandController {
  createBrand = (req, res) => {
    res.json({
      data: null,
      message: "brand created",
      status: "OK",
    });
  };

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
