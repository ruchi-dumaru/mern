const bannerRouter=require('express').Router();
const bannerCtrl=require('./banner.controller');


//banner routes mount
bannerRouter.post('/',bannerCtrl.createBanner);
bannerRouter.get('/',bannerCtrl.listAllBanner);
bannerRouter.get('/:id',bannerCtrl.listSpecificBannerById);
bannerRouter.put('/:id',bannerCtrl.updateBannerById);
bannerRouter.delete('/:id',bannerCtrl.deleteBannerById);


module.exports=bannerRouter