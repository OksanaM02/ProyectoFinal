import mongoose from "mongoose";

const { Schema } = mongoose;

const CartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: false},
  cantidad: { type: Number, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model("Cart", CartSchema);
