const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Transaction = require("../models/transition.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: "rzp_test_x05ld753Ga9eFk",
  key_secret: "wgTVEx9VWx0XXvgIFC8nJx4X",
});

class OrderController {
  placeOrder({
    order_total,
    user_details,
    product_details,
    shipping_details,
    payment_mode,
  }) {
    return new Promise((res, rej) => {
      try {
        const order = new Order({
          order_total,
          user_details,
          product_details,
          shipping_details,
          payment_mode,
        });
        order
          .save()
          .then(async (success) => {
            if (payment_mode == "2") {
              const options = {
                amount: order_total * 100,
                currency: "INR",
                receipt: order._id.toString(),
              };
              instance.orders.create(options, async (err, razorpay_order) => {
                if (err) {
                  console.log(err);
                  rej({
                    msg: "Payment Failed",
                    status: 0,
                  });
                } else {
                  await Cart.deleteMany({ user_id: user_details });
                  res({
                    msg: "Order Placed Successfully",
                    status: 1,
                    payment_mode,
                    order_id: order._id,
                    razorpay_order,
                    amount: order_total,
                    shipping_details,
                  });
                }
              });
            } else {
              await Cart.deleteMany({ user_id: user_details });
              res({
                msg: "Order Placed Successfully",
                status: 1,
                payment_mode,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            rej({
              msg: "Unable To Place Order",
              status: 0,
            });
          });
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }

  getOrders(user) {
    return new Promise(async (res, rej) => {
      try {
        let order;
        if (user == "undefined") {
          order = await Order.find().populate("user_details");
        } else {
          console.log("in");
          order = await Order.find({ user_details: user });
        }
        if (order) {
          res({
            msg: "Orders Found",
            status: 1,
            order,
          });
        } else {
          rej({
            msg: "Unable To Find Orders",
            status: 0,
          });
        }
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }

  verifyOrder({ order_id, response = null }) {
    return new Promise(async (res, rej) => {
      try {
        const secret = "wgTVEx9VWx0XXvgIFC8nJx4X";
        const generated_signature = crypto
          .createHmac("sha256", secret)
          .update(
            response.razorpay_order_id + "|" + response.razorpay_payment_id
          )
          .digest("hex");

        if (generated_signature === response.razorpay_signature) {
          const order = await Order.findById(order_id);
          if (!order) {
            rej({
              msg: "Order not found",
              status: 0,
            });
            return;
          }
          const newTransaction = new Transaction({
            order_id: order._id,
            userId: order.user_details,
            amount: order.order_total,
            type: order.payment_mode,
            payment_status: true,
            razorpay_response: response,
          });
          newTransaction
            .save()
            .then(async (success) => {
              await Order.updateOne(
                { _id: order_id },
                {
                  transaction_id: newTransaction._id,
                  order_status: 2,
                }
              );
              res({
                msg: "Order Placed Successfully",
                status: 1,
              });
            })
            .catch((err) => {
              rej({
                msg: "Unable To Save Order",
                status: 0,
              });
            });
        } else {
          rej({
            msg: "Payment verification failed",
            status: 0,
          });
        }
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  orderFailed({ order_id, razorpay_payment_id, razorpay_order_id }) {
    return new Promise(async (res, rej) => {
      try {
        const order = await Order.findById(order_id);
        if (!order) {
          rej({
            msg: "Order not found",
            status: 0,
          });
          return;
        }
        const newTransaction = new Transaction({
          order_id: order._id,
          userId: order.user_details,
          amount: order.order_total,
          type: order.payment_mode,
          payment_status: false,
          razorpay_response: { razorpay_order_id, razorpay_payment_id },
        });
        newTransaction
          .save()
          .then(async (success) => {
            res({
              msg: "Order Payment Failed",
              status: 0,
            });
          })
          .catch((err) => {
            rej({
              msg: "Unable To Save Order",
              status: 0,
            });
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

module.exports = OrderController;
