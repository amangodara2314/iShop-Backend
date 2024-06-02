const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user_details: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  shipping_details: {
    type: Object,
  },
  product_details: [
    {
      type: Object,
    },
  ],
  order_total: {
    type: Number,
  },
  payment_mode: {
    type: Number,
    enum: [1, 2],
  },
  order_status: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
  },
  transaction_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Transaction",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
