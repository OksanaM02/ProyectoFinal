import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: false },
  descripcion: { type: String, required: false },
  alergenos: { type: String, required: false },
  price: { type: Number, required: true },
  cantidad: { type: Number, required: true }
});

export default mongoose.model("Product", ProductSchema);
