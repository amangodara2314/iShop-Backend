const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  finalPrice: {
    type: Number,
  },
  category_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
  colors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Color",
    },
  ],
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
