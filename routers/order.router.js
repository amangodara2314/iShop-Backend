const { Router } = require("express");
const OrderController = require("../controllers/order.controller");

const OrderRouter = Router();

OrderRouter.post("/place-order", (req, res) => {
  new OrderController()
    .placeOrder(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

OrderRouter.get("/get/:userId?", (req, res) => {
  new OrderController()
    .getOrders(req.params.userId)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

OrderRouter.post("/verify", (req, res) => {
  new OrderController()
    .verifyOrder(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

OrderRouter.post("/failed", (req, res) => {
  new OrderController()
    .orderFailed(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});
module.exports = OrderRouter;
