const SessionModel = require("./session.model");

class AuthService {
 async  storeSession(userId, token) {
    try {
      const sessionObj = new SessionModel({
        user: userId,
        accessToken: token,
        device: "web",
        data: JSON.stringify({}),
      });
      return await sessionObj.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter){
    try{
      return await SessionModel.findOne(filter).populate('user',['_id','name','email','address','phone','dob','status','gender','image','role']);
    }catch(exception){
      throw exception
    }
  }
}

module.exports = new AuthService();
