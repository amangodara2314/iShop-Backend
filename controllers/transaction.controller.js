const Transaction = require("../models/transition.model");

class TransactionController {
  getTransactions() {
    return new Promise(async (res, rej) => {
      try {
        const transaction = await Transaction.find().populate("userId");
        res({
          msg: "transactions found",
          status: 1,
          transaction,
        });
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
}

module.exports = TransactionController;
