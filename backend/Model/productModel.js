import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name"],
  },
  image: String,
  description: String,
  brand: String,
  category: String,
  price: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  countInStock: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
