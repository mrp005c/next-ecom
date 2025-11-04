// models/Product.js
import mongoose from "mongoose";
// import  AutoCrement from 'mongoose-sequence'
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userInfoSchema = new mongoose.Schema({
      name: String,
      email: { type: String , required: true},
      phone: { type: String, minLength: [11, 'Must be at least 11, got {VALUE}'], maxLength: 14 , required: true},
      address: { type: String , required: true },
    })
const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    userInfo: userInfoSchema,
    orderId: { type: Number },
    products: { type: Array, min: 1 },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

// Apply the plugin to the schema
OrderSchema.plugin(AutoIncrement, { inc_field: "orderId" });

// Avoid model overwrite issue in Next.js
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
