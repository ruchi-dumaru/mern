class productController {
  createproduct = (req, res) => {
    res.json({
      data: null,
      message: "product created",
      status: "OK",
    });
  };

  listAllproduct = (req, res) => {
    res.json({
      data: null,
      message: "All product List",
      status: "OK",
    });
  };

  viewproductDetailById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `product detail of ${params.id}`,
      status: "OK",
    });
  };

  viewproductDetailBySlug = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `product detail of ${params.slug}`,
      status: "OK",
    });
  };

  updateproductById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `product update for ${params.id}`,
      status: "OK",
    });
  };

  deleteproductById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `product deleted for ${params.id}`,
      status: "OK",
    });
  };
}

const productCtrl = new productController();

module.exports = productCtrl;
