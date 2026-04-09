class categoryController {
  createCategory = (req, res) => {
    res.json({
      data: null,
      message: "category created",
      status: "OK",
    });
  };

  listAllCategories = (req, res) => {
    res.json({
      data: null,
      message: "All category List",
      status: "OK",
    });
  };

  viewCategoryDetailById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `Category detail of ${params.id}`,
      status: "OK",
    });
  };

  viewCategoryDetailBySlug = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `Category detail of ${params.slug}`,
      status: "OK",
    });
  };

  updateCategoryById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `Category update for ${params.id}`,
      status: "OK",
    });
  };

  deleteCategoryById = (req, res) => {
    const params = req.params;
    res.json({
      data: { params },
      message: `Category deleted for ${params.id}`,
      status: "OK",
    });
  };
}

const categoryCtrl = new categoryController();

module.exports = categoryCtrl;
