import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
