//generate random number as activation token
const fs = require("fs");


const generateRandomString = (length = 100) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const len = chars.length;
  let random = "";

  for (let i = 1; i <= length; i++) {
    let posn = Math.ceil(Math.random() * (len - 1));

    random += chars[posn];
  }
  return random;
};

const fileDelete = (filepath) => {
  if (fs.existsSync(filepath)) {
    return fs.unlinkSync(filepath);
  }
  return false;
};

module.exports = {
  generateRandomString,
  fileDelete
};
