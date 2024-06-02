const { Router } = require("express");
const TransactionController = require("../controllers/transaction.controller");

const TransactionRouter = Router();

TransactionRouter.get("/get", (req, res) => {
  new TransactionController()
    .getTransactions(req.params.userId)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

module.exports = TransactionRouter;
