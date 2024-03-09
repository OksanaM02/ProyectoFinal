import Order from '../../model/Pedido.js';
import Cart from '../../model/Carrito.js';
//import { limpiarCarrito } from './Cart-db-services.js';

export async function crearPedido() {
  try {
    const carrito = await Cart.find();

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
      throw new Error('El carrito está vacío. No se puede crear un pedido.');
    }

    // Crear la lista de productos del pedido a partir del carrito
    const productos = carrito.map(item => ({
      producto: item._id,
      cantidad: item.cantidad
    }));

    // Calcular el total del pedido
    const total = carrito.reduce((acc, item) => acc + (item.cantidad * item.price), 0);

    // Crear el pedido
    const newPedido = new Pedido({
      productos,
      total
    });
    const savedPedido = await newPedido.save();

    // Limpiar el carrito después de crear el pedido
    await Cart.deleteMany();

    return savedPedido;
  } catch (error) {
    throw new Error('No se pudo crear el pedido');
  }
}
export async function obtenerPedidosDB() {
  try {
    const pedidos = await Order.find();
    return pedidos;
  } catch (error) {
    throw new Error('No se pudieron obtener los pedidos');
  }
}

export async function eliminarPedidoDB(Id) {
  try {
    const pedidoEliminado = await Order.findByIdAndDelete(Id);
    if (!pedidoEliminado) {
      throw new Error('Pedido no encontrado');
    }
    return pedidoEliminado;
  } catch (error) {
    throw new Error('No se pudo eliminar el pedido');
  }
}
