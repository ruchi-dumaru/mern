const { AppConfig } = require("../../config/config");
const MailService = require("../../service/mail.service");

class AuthMailService extends MailService {
  activateUserAccount(user) {
    let activationLink=AppConfig.frontendUrl+"/activate/"+user.activationToken
    try {
      return this.sendMail({
        to: user.email,
        subject: "Activate your Account",
        message: `Dear ${user.name.split("").shift()},\n
        Thank you for registering with us.Your uesername is: ${user.email}\n
        Click the link below to activate your account\n
        <a href='${activationLink}'>Activate From Here</a>\n
        This link will be valid till  ....`,
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const authMailSvc = new AuthMailService();
module.exports = authMailSvc;
