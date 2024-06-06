import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ItemCestaSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: "Pastel" }, // Referencia al ítem (pastel) comprado
    cantidad: { type: Number, default: 1 }, // Cantidad comprada del ítem
});

const CestaSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Campo que almacena el ID del usuario
        nombreUsuario: { type: String, required: true }, // Nombre del usuario para visualización
        items: [ItemCestaSchema], // Array de ítems comprados
        precioTotal: { type: Number, default: 0 }, // Precio total de la compra
    },
    { timestamps: true }
);

export default model("Cesta", CestaSchema);
