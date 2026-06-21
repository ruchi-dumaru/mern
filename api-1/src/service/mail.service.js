const nodemailer = require("nodemailer");
const { EmailConfig, SmtpConfig } = require("../config/config");

class MailService {
  // Create a transporter using SMTP
  //connection betn nodejs server and smtp server through transporter
  #transporter;
  constructor() {
    try {
      this.#transporter = nodemailer.createTransport(EmailConfig.gmail);
      console.log('******SMTP Server Connected,Service provider:Gmail********')
    } catch (exception) {
      console.log(exception);
      throw {
        code: 500,
        message: "SMTP Server connection failed",
        status: "SMTP_ERR",
      };
    }
  }

  // code to send email from server to user

  async sendMail({
    to,
    subject,
    message,
    cc = null,
    bcc = null,
    attachments = null,
  }) {
    try {
      let messageBody = {
        from: SmtpConfig.smtpFrom,
        to: to,
        subject: subject,
        html: message,
      };
      if (cc) {
        messageBody["cc"] = cc;
      }
      if (bcc) {
        messageBody["bcc"] = bcc;
      }
      if (attachments) {
        messageBody["attachments"] = attachments;
      }
      return await this.#transporter.sendMail(messageBody);
    } catch (exception) {
      console.log(exception);
      throw {
        code: 500,
        message: "Email sending failed...",
        status: "SMTP_EMAIL_SEND_ERR",
      };
    }
  }
}

module.exports = MailService;
