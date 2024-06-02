const UserController = require("../controllers/user.controller");
const { Router } = require("express");
const { createToken } = require("../middlewares/auth");

const UserRouter = Router();

UserRouter.post("/create", (req, res) => {
  new UserController()
    .create(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

UserRouter.post("/login", (req, res) => {
  new UserController()
    .login(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

module.exports = UserRouter;
