import {
  crearPedido,
  obtenerPedidosDB,
  eliminarPedidoDB
} from '../services/database/Pedido-db-services.js';

export async function crearPedidoCont(req, res, next) {
  try {
    const nuevoPedido = await crearPedido();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPedidosCont(req, res, next) {
  try {
    const pedidos = await obtenerPedidosDB();
    res.status(200).json(pedidos);
  } catch (error) {
    next(error);
  }
}

export async function eliminarPedidoCont(req, res, next) {
  try {
    const pedidoId = req.params.id;
    const pedidoEliminado = await eliminarPedidoDB(pedidoId);
    res.status(200).json({ message: 'Pedido eliminado', pedidoEliminado });
  } catch (error) {
    next(error);
  }
}
