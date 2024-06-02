const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
  amount: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["1", "2"],
  },
  payment_status: {
    type: Boolean,
  },
  razorpay_response: {
    type: Object,
    default: null,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
