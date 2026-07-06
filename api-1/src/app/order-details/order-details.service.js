const OrderDetailModel = require("./order-details.model");

class OrderDetailService {
  async getSingleRowByFilter(filter) {
    try {
      const orderDetail = await OrderDetailModel.findOne(filter)
        .populate("order", [
          "_id",
          "orderCode",
          "subtotal",
          "tax",
          "serviceCharge",
          "deliveryCharge",
          "total",
          "isPaid",
          "status",
        ])
        .populate("product", [
          "_id",
          "name",
          "slug",
          "price",
          "discount",
          "afterDiscountAmount",
          "status",
          "images",
          "seller",
        ])
        .populate("buyer", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])
        .populate("seller", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ]);
      return orderDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter,config={page:1,limit:20}){
    //{data,pagination,{page:n,l:n,total:n}}
    try{
      const skip=(config.page-1)*config.limit
      const data =await OrderDetailModel.find(filter)
      .populate("order", [
          "_id",
          "orderCode",
          "subtotal",
          "tax",
          "serviceCharge",
          "deliveryCharge",
          "total",
          "isPaid",
          "status",
        ])
        .populate("product", [
          "_id",
          "name",
          "slug",
          "price",
          "discount",
          "afterDiscountAmount",
          "status",
          "images",
          "seller",
        ])
        .populate("buyer", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])
        .populate("seller", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])
        .sort({createdAt:"desc"})
        .limit(config.limit)
        .skip(skip);

        const count=await OrderDetailModel.countDocuments(filter)

        return {
          data:data,
          pagination:{
            page:config.page,
            limit:config.limit,
            total:count
          }
        }

    }catch(exception){
      throw exception
    }
  }
  async addToCart(data) {
    try {
      const orderDetail = new OrderDetailModel(data);
      await orderDetail.save();
      return await this.getSingleRowByFilter({ _id: orderDetail._id });
    } catch (exception) {
      throw exception;
    }
  }

   async removeFromCart(filter) {
    try {
      return await OrderDetailModel.findOneAndDelete(filter);
      
    } catch (exception) {
      throw exception;
    }
  }

  async updateOrderDetailsByFilter(data,filter){
    try{
return await OrderDetailModel.updateMany(filter,{$set:data})
    }catch(exception){
      throw exception
    }
  }



}

module.exports = new OrderDetailService();
