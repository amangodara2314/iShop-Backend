const { Router } = require("express");
const CartController = require("../controllers/cart.controller");

const CartRouter = Router();

CartRouter.post("/state-to-cart/:id", (req, res) => {
  new CartController()
    .stateToCart(req.params.id, req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

CartRouter.post("/carttodb", (req, res) => {
  new CartController()
    .cartToDb(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

CartRouter.put("/change-qty", (req, res) => {
  new CartController()
    .changeQty(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

CartRouter.delete("/delete-product", (req, res) => {
  console.log("in");
  console.log(req.body);
  new CartController()
    .delete(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

module.exports = CartRouter;
