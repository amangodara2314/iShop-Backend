const Cart = require("../models/cart.model");

class CartController {
  stateToCart(id, data) {
    return new Promise(async (res, rej) => {
      try {
        for (const d of data) {
          const existingCart = await Cart.findOne({
            user_id: id,
            pId: d.pId,
          });

          if (existingCart) {
            await Cart.updateOne(
              { user_id: id, pId: d.pId },
              { qty: existingCart.qty + d.qty }
            );
          } else {
            await new Cart({
              user_id: id,
              pId: d.pId,
              qty: d.qty,
            }).save();
          }
        }
        const cart = await Cart.find({ user_id: id }).populate("pId");
        res({
          msg: "Cart Updated Successfully",
          status: 1,
          cart,
        });
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  cartToDb(data) {
    return new Promise(async (res, rej) => {
      try {
        const existingprod = await Cart.findOne({
          user_id: data.id,
          pId: data.pId,
        });
        if (existingprod) {
          await Cart.updateOne(
            { user_id: data.id, pId: data.pId },
            { qty: existingprod.qty + 1 }
          );
        } else {
          new Cart({
            user_id: data.id,
            pId: data.pId,
            qty: 1,
          }).save();
        }
        const cart = await Cart.find({ user_id: data.id }).populate("pId");
        res({
          msg: "Cart Added Successfully",
          status: 1,
          cart,
        });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  changeQty(data) {
    return new Promise(async (res, rej) => {
      try {
        const existingprod = await Cart.findOne({
          user_id: data.id,
          pId: data.pId,
        });
        if (existingprod) {
          if (data.flag) {
            await Cart.updateOne(
              { user_id: data.id, pId: data.pId },
              { qty: existingprod.qty + 1 }
            );
          } else {
            await Cart.updateOne(
              { user_id: data.id, pId: data.pId },
              { qty: existingprod.qty - 1 }
            );
          }
          res({
            msg: "updated successfully",
            status: 1,
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
  delete(data) {
    return new Promise(async (res, rej) => {
      try {
        // console.log(data);
        // console.log(await Cart.findOne({ user_id: data.id, pId: data.pId }));
        Cart.deleteOne({ user_id: data.id, pId: data.pId })
          .then((success) => {
            res({
              msg: "deleted successfully",
              status: 1,
            });
          })
          .catch((err) => {
            rej({
              msg: "unable to delete",
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

module.exports = CartController;
