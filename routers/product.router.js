const Product = require("../models/product.model");
const { Router } = require("express");
const fileUpload = require("express-fileupload");
const ProductController = require("../controllers/product.controller");
const { restrictedToLoggedInUserOnly } = require("../middlewares/auth");

const ProductRouter = Router();

ProductRouter.post(
  "/create",
  restrictedToLoggedInUserOnly,
  fileUpload({ createParentPath: true }),
  (req, res) => {
    new ProductController()
      .create(req.body, req.files?.image)
      .then((success) => res.send(success))
      .catch((err) => res.send(err));
  }
);

ProductRouter.get("/:id?", (req, res) => {
  new ProductController()
    .read(req.params.id, req.query)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

ProductRouter.delete(
  "/delete/:id",
  restrictedToLoggedInUserOnly,
  (req, res) => {
    new ProductController()
      .delete(req.params.id)
      .then((success) => res.send(success))
      .catch((err) => res.send(err));
  }
);

ProductRouter.patch(
  "/update-status/:id/:status",
  restrictedToLoggedInUserOnly,
  (req, res) => {
    new ProductController()
      .changeStatus(req.params.id, req.params.status)
      .then((success) => res.send(success))
      .catch((err) => res.send(err));
  }
);

ProductRouter.put(
  "/update/:id",
  restrictedToLoggedInUserOnly,
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
    new ProductController()
      .update(req.params.id, req.body, req.files?.image)
      .then((success) => res.send(success))
      .catch((err) => res.send(err));
  }
);

module.exports = ProductRouter;
