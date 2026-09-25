//dynamic or paramaterized router
//http://localhost:9006/api/v1/auth/activate/9891gdfnb3$$

const { AppConfig } = require("../../config/config");
const { Status } = require("../../config/constant.config");
const { generateRandomString, dateCreate } = require("../../utilities/helper");
const userScv = require("../user/user.service");
const authMailSvc = require("./auth.mail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthService = require("./auth.service");
const authService = require("./auth.service");
const SessionModel = require("./session.model");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await userScv.transformDataToUser(req);
      const user = await userScv.storeUser(data);

      await authMailSvc.activateUserAccount(user);
      //smpt-->Gmail
      //SMS-->GSM
      //Push--->Google(firebase)
      res.status(201).json({
        data: userScv.getUserProfile(user),
        activationToken: user.activationToken,
        message: "User registered succesfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
    try {
      const token = req.params.token;
      let userDetail = await userScv.getSingleRowByFilter({
        activationToken: token,
      });

      if (!userDetail) {
        throw {
          code: 404,
          message: "Token not found",
          status: "TOKEN_NOT_FOUND",
        };
      }

      const today = Date.now();
      const expiry = userDetail.expiry.getTime();

      // if token expired
      if (today > expiry) {
        throw {
          code: 422,
          message: "Your token or link has been expired",
          status: "TOKEN_EXPIRED",
        };
      }

      //if token not expired user is activated

      userDetail = await userScv.updateSingleRowByFilter(
        { _id: userDetail._id },
        {
          status: Status.ACTIVE,
          activationToken: null,
          expiry: null,
        },
      );

      // after user gets activated
      //notify

      await authMailSvc.WelcomeMessageToUser(userDetail);

      res.json({
        data: userDetail,
        message: "Account activated successfully",
        status: "ACTIVATION_SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  };

  resendToken = async (req, res, next) => {
    try {
      const token = req.params.token;
      let userDetail = await userScv.getSingleRowByFilter({
        activationToken: token,
      });

      if (!userDetail) {
        throw {
          code: 404,
          message: "Token not found",
          status: "TOKEN_NOT_FOUND",
        };
      }

      const today = Date.now();
      const expiry = userDetail.expiry.getTime();

      // if token expired
      if (today <= expiry) {
        throw {
          code: 422,
          message: "Your token or link has not been expired",
          status: "TOKEN_NOT_EXPIRED",
        };
      }

      //if token not expired user is activated

      const updateData = {
        activationToken: generateRandomString(),
        expiry: dateCreate(new Date(), 1),
      };

      userDetail = await userScv.updateSingleRowByFilter(
        { _id: userDetail._id },
        updateData,
      );

      //update
      userDetail.activationToken = updateData.activationToken;

      await authMailSvc.resendTokenActivation(userDetail);

      res.json({
        data: userDetail,
        message: "Link reactivated",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userDetail = await userScv.getSingleRowByFilter({ email: email });

      if (!userDetail) {
        throw {
          code: 422,
          message: "Email not registered yet",
          status: "EMAIL_NOT_FOUND",
        };
      }

      if (userDetail.status !== Status.ACTIVE) {
        throw {
          code: 422,
          message: "Account not activated",
          status: "ACCOUNT_NOT_ACTIVATED",
        };
      }

      if (!bcrypt.compareSync(password, userDetail.password)) {
        throw {
          code: 422,
          message: "Invalid credentials",
          status: "INVALID_CREDENTIALS",
        };
      }

      //token
      //  jwt.sign(payload, secretOrPrivateKey, [options, callback])
      const accessToken = jwt.sign(
        { sub: userDetail._id, typ: "Bearer" },
        AppConfig.jwtSecret,
        { expiresIn: "1d" },
      );

      //session store

      const result = await AuthService.storeSession(
        userDetail._id,
        accessToken,
      );
      console.log(await SessionModel.countDocuments());
      // console.log("loggged in user ::", result);
      res.json({
        data: accessToken,
        user: userScv.getUserProfile(userDetail),
        role: userDetail.role,
        message: "Login successful",
        status: "LOGIN_SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getLoggedInUser = (req, res) => {
    const userProfile = userScv.getUserProfile(req.loggedInUser);
    res.json({
      data: req.loggedInUser,
      user: userProfile,
      role: req.loggedInUser.role,
      message: "MY profile",
      status: "OK",
    });
  };

  loggedOut = async (req, res, next) => {
    try {
      //loggedout from current device
      let filter = {
        accessToken: req.headers["authorization"].replace("Bearer ", ""),
      };

      //logout from all
      if (req.query.devices === "all") {
        filter = {
          user: req.loggedInUser._id,
        };
      }

      await authService.deleteManyByFilter(filter);
    } catch (exception) {
      next(exception);
    }
    res.json({
      data: null,
      message: "You have been logged out",
      status: "OK",
    });
  };

  updateUserProfile = (req, res) => {
    try {
    } catch (exception) {
      next(exception);
    }
    res.json({
      data: {},
      message: "Can Update Profile",
      status: "OK",
    });
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;

// try{
//     //   const token=req.params.token;
//     // const userDetail= await userScv.findUserByToken({activationToken:token})
//     // if(!userDetail){
//     //   throw{
//     //     code:404,
//     //     message:"Token not found or broken",
//     //     status:"TOKEN_NOT_FOUND"
//     //  }
