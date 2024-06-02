const { Router } = require("express");
const AdminController = require("../controllers/admin.controller");
const AdminRouter = Router();

AdminRouter.post("/token", (req, res) => {
  new AdminController()
    .getToken(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

module.exports = AdminRouter;
