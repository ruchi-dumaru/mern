require("dotenv").config(); //.env available to this file

const DBConfig = {
  mongodbUrl: process.env.MONGODB_URL,
  mongodbName: process.env.MONGODB_DB_NAME,
};
// constant expose

const CloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUDNAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

const SmtpConfig = {
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpFrom: process.env.SMTP_FROM_ADDRESS,
};

const EmailConfig = {
  gmail: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
};

const AppConfig = {
  frontendUrl: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET,

  khaltiSecretKey: process.env.KHALTI_SECRET_KEY,
  khaltiBaseUrl:
    (
      process.env.KHALTI_BASE_URL ||
      process.env.KHALTI_GATEWAY_URL ||
      ""
    ).replace(/\/$/, "") + "/",
};

module.exports = {
  DBConfig,
  CloudinaryConfig,
  SmtpConfig,
  EmailConfig,
  AppConfig,
};

// we have taken excess of config such that we don't need to import dotenv pkg in multiple pg
//integration of mongodb in project is required which is done by mongoose ODM we write it's code in separate file

// operation:dbconnection and selection
