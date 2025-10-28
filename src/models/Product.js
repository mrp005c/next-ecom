// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  rating: Number,
  inStock: Boolean,
  productId: String,
}, { timestamps: true });

// Avoid model overwrite issue in Next.js
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
