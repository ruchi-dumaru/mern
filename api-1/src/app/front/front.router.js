const frontRouter=require('express').Router();

frontRouter.get('/',(req,res,next)=>{
  res.status(200).json({
    des:{
      title:"home page",
      discription:"this is ecommerec platform",
      status:"ok"
    }
  });
})

frontRouter.get('/product',(req,res,next)=>{
res.status(200).json({
  des:{
    title:"product list",
    dis:"list of all stock product",
   status:"OK"
  }
})
})
module.exports=frontRouter