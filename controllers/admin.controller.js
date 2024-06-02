const jwt = require("jsonwebtoken");
const SECRET_KEY = "ishop2314";

class AdminController {
  getToken(data) {
    return new Promise((res, rej) => {
      try {
        const token = jwt.sign(data, SECRET_KEY);
        res({
          msg: "login successfull",
          status: 1,
          token: token,
        });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
}

module.exports = AdminController;
