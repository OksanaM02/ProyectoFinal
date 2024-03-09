import mongoose from 'mongoose';

const { Schema } = mongoose;

const PedidoSchema = new Schema({
  productos: [{
    producto: { type: Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, required: true }
  }],
  total: { type: Number, required: true }
});

export default mongoose.model('Pedido', PedidoSchema);
