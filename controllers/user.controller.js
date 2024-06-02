const { createToken } = require("../middlewares/auth");
const User = require("../models/user.model");
const { encrypt, decrypt } = require("../utils/encryption");
class UserController {
  create(data) {
    return new Promise((res, rej) => {
      try {
        const user = new User({
          name: data.name,
          email: data.email,
          password: encrypt(data.password),
        });
        const token = createToken(user);
        user
          .save()
          .then((success) => {
            res({
              msg: "User Added Successfully",
              status: 1,
              user,
              token,
            });
          })
          .catch((err) => {
            rej({
              msg: "Unable To Add User",
              status: 0,
            });
          });
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  login(data) {
    return new Promise(async (res, rej) => {
      try {
        const user = await User.findOne({ email: data.email });
        const token = createToken(user);

        if (user) {
          if (decrypt(user.password) == data.password) {
            res({
              msg: "Login Successfull",
              status: 1,
              user,
              token,
            });
          } else {
            rej({
              msg: "Incorrect Password",
              status: 0,
            });
          }
        } else {
          rej({
            msg: "Invalid Email",
            status: 0,
          });
        }
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

module.exports = UserController;
