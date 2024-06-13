import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ItemCestaSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: "Pastel" },
    cantidad: { type: Number, default: 1 },
});

const CestaSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        nombreUsuario: { type: String, required: true },
        items: [ItemCestaSchema],
        precioTotal: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default model("Cesta", CestaSchema);
