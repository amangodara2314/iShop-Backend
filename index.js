const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const DB = process.env.MONGODB;
const CategoryRouter = require("./routers/category.router");
const ColorRouter = require("./routers/colors.router");
const ProductRouter = require("./routers/product.router");
const UserRouter = require("./routers/user.router");
const CartRouter = require("./routers/cart.router");
const OrderRouter = require("./routers/order.router");
const TransactionRouter = require("./routers/transaction.router");
const app = express();
const bodyParser = require("body-parser");
const { restrictedToLoggedInUserOnly } = require("./middlewares/auth");
const AdminRouter = require("./routers/admin.router");
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/user", UserRouter);
app.use("/color", ColorRouter);
app.use("/product", ProductRouter);
app.use("/category", CategoryRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);
app.use("/transaction", restrictedToLoggedInUserOnly, TransactionRouter);
app.use("/admin", AdminRouter);

mongoose
  .connect(DB, {
    dbName: "ishop",
  })
  .then((success) => {
    console.log("db connected");
    app.listen(5000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
