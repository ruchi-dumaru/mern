class bannerController {
  createBanner = (req, res) => {
    res.json({
      data: null,
      message: "Banner Created",
      status: "OK",
    });
  };

  listAllBanner = (req, res) => {
    res.json({
      data: null,
      message: "AllBanner List",
      status: "OK",
    });
  };

  listSpecificBannerById = (req, res) => {
    const params = req.params;
    res.json({
      data: params,
      message: `Banner Detail of ${params.id}`,
      status: "OK",
    });
  };

  updateBannerById = (req, res) => {
    const params = req.params;
    res.json({
      data: params,
      message: "Banner Updated for " + params.id,
      status: "OK",
    });
  };

  deleteBannerById = (req, res) => {
    const params = req.params;//obj{id:123$$} so params.id=value
    res.json({
      data: params,
      message:  `Banner Deleted for  ${params.id}`,
      status: "OK",
    });
  };
}

const bannerCtrl = new bannerController();

module.exports = bannerCtrl;
