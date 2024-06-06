import mongoose from "mongoose";

const { Schema, model } = mongoose;

const pastelSchema = new Schema({
    nombre: String,
    precio: { type: Number, min: 0 },
    alergenos: [String],
    foto: String,
    descripcion: String,
});

export default model("Pastel", pastelSchema);
