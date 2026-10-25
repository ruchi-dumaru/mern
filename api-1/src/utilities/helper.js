//generate random number as activation token
const fs = require("fs");
const crypto = require("crypto");


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

const generateActivationToken = (bytes = 75) => {
  return crypto.randomBytes(bytes).toString("base64url");
};

const fileDelete = (filepath) => {
  if (fs.existsSync(filepath)) {
    return fs.unlinkSync(filepath);
  }
  return false;
};

const dateCreate=(date,day)=>{
let dateObj=new Date(date);
const newDate=dateObj.getTime()+(day*86400000)
return new Date(newDate)
}

module.exports = {
  generateRandomString,
  generateActivationToken,
  fileDelete,
  dateCreate
};
