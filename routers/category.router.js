const e = require("express");
const CategoryController = require("../controllers/category.controller");
const { Router } = require("express");
const fileUpload = require("express-fileupload");
const { restrictedToLoggedInUserOnly } = require("../middlewares/auth");

const CategoryRouter = Router();

CategoryRouter.post(
  "/create",
  restrictedToLoggedInUserOnly,
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
    const data = req.body;
    const result = new CategoryController()
      .create(data, req.files?.image)
      .then((success) => res.send(success))
      .catch((err) => res.send(err));
  }
);

CategoryRouter.get("/:id?", (req, res) => {
  const result = new CategoryController()
    .read(req.params.id)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

CategoryRouter.delete(
  "/delete/:id",
  restrictedToLoggedInUserOnly,
  (req, res) => {
    new CategoryController()
      .delete(req.params.id)
      .then((success) => res.send(success))
      .catch((err) => res.send(err));
  }
);

CategoryRouter.put(
  "/update/:id",
  restrictedToLoggedInUserOnly,
  fileUpload({ createParentPath: true }),
  (req, res) => {
    new CategoryController()
      .update(req.params.id, req.body, req.files?.image)
      .then((success) => res.send(success))
      .catch((err) => res.send(err));
  }
);

CategoryRouter.patch(
  "/update-status/:id/:status",
  restrictedToLoggedInUserOnly,
  (req, res) => {
    new CategoryController()
      .changeStatus(req.params.id, req.params.status)
      .then((success) => res.send(success))
      .catch((err) => res.send(err));
  }
);

module.exports = CategoryRouter;
