//dynamic or paramaterized router
//http://localhost:9001/api/v1/auth/activate/9891gdfnb3$$

const userScv = require("../../user/user.service");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = userScv.transformDataToUser(req);
      const user = await userScv.storeUser(data);
console.log("richhhhhhhhhhhhh")
console.log(req.file)
      res.status(201).json({
        data: userScv.getUserProfile(user),
        message: "User registered succesfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = (req, res, next) => {
    const params = req.params;
    const query = req.query;
    res.json({
      data: {
        params,
        query,
      },
      message: "Activation route",
      status: "OK",
    });
  };

  loginUser = (req, res) => {
    res.json({
      data: {},
      message: "User logged In",
      status: "OK",
    });
  };

  getLoggedInUser = (req, res) => {
    // Is the user logged In  ?
    //success=> response
    //failure=>error msg
    res.json({
      data: {},
      message: "Fetch logged In User",
      status: "OK",
    });
  };

  updateUserProfile = (req, res) => {
    // Is the user logged In  ?
    //success=> response
    //failure=>error msg
    res.json({
      data: {},
      message: "Can Update Profile",
      status: "OK",
    });
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;
