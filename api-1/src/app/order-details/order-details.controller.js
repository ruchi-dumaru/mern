const { OrderStatus } = require("../../config/constant.config");
const productService = require("../product/product.service");
const orderDetailsService = require("./order-details.service");

class OrderDetailController {
  async addToCart(req, res, next) {
    try {
      console.log("hiiiiii")
      const loggedInUser = req.loggedInUser;
      const { productId, quantity } = req.body;

      //productDetail
      const productDetail = await productService.getSingleRowByFilter({
        _id: productId,
      });

      console.log(productDetail)
      if (!productDetail) {
        throw {
          code: 404,
          message: "Product not found",
          status: "PRODUCT_NOT_FOUND",
        };
      }

      //cart add
      let cartExists = await orderDetailsService.getSingleRowByFilter({
        order: { $eq: null },
        status: OrderStatus.PENDING,
        product: productId,
        buyer: loggedInUser._id,
      });
    console.log("cartExists:",cartExists)

    
      if (cartExists) {
        //already added in the cart
        cartExists.quantity += +quantity;
        cartExists.price = productDetail.afterDiscountAmount;
        ((cartExists.subtotal =
          cartExists.quantity * productDetail.afterDiscountAmount),
          (cartExists.tax = cartExists.subtotal * 0.13));
        cartExists.total = cartExists.subtotal + cartExists.tax;

        await cartExists.save()
        res.json({
          data:cartExists,
          message:"Your cart item updated",
          status:"OK"
        })
      } else {
        //new entry for the cart
        let cartObj ={
          order:null,
          buyer:loggedInUser._id,
          product:productDetail._id,
          quantity:quantity,
          price:productDetail.afterDiscountAmount,
          subtotal:quantity* productDetail.afterDiscountAmount,
          tax:quantity* productDetail.afterDiscountAmount * 0.13,
          total:quantity* productDetail.afterDiscountAmount+
          quantity* productDetail.afterDiscountAmount* 0.13,
          seller:productDetail.seller?._id,
          status: OrderStatus.PENDING,
          createdBy:req.loggedInUser._id,

        };
        cartObj=await orderDetailsService.addToCart(cartObj)
        res.json({
          data:cartObj,
          message:"Add to cart success",
          status:"OK"
        })
      }
    } catch (exception) {
      next(exception);
    }
  }
}

const orderDetailCtrl = new OrderDetailController();
module.exports = orderDetailCtrl;
