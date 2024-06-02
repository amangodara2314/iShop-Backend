const Cryptr = require("cryptr");
const cryptr = new Cryptr("ishopAdmin");

const encrypt = (password) => {
  return cryptr.encrypt(password);
};

const decrypt = (password) => {
  return cryptr.decrypt(password);
};

module.exports = { encrypt, decrypt };
