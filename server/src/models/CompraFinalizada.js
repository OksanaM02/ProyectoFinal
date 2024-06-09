import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ItemPedidosRealizadosSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: "Pastel" },
    cantidad: { type: Number, default: 1 },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
});

const PedidosRealizadosSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        nombreUsuario: { type: String, required: true },
        items: [ItemPedidosRealizadosSchema],
        precioTotal: { type: Number, default: 0 },
        fechaCompra: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default model("PedidosRealizados", PedidosRealizadosSchema);
