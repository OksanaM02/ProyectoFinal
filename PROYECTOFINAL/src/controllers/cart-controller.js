import {
  agregarAlCarritoDB,
  eliminarDelCarritoDB,
  obtenerDetallesDelCarritoDB,
} from '../services/database/Cart-db-services.js';
import Product from '../model/Producto.js'

export async function agregarAlCarritoCont(req, res, next) {
  try {
    const { id } = req.params; // Se espera que el cuerpo de la solicitud contenga solo el ID del producto
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Agregar el producto al carrito
    const newItem = await agregarAlCarritoDB(product);

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error al agregar artículo al carrito:', error);
    next(error);
  }
}
export async function eliminarDelCarritoCont(req, res, next) {
  try {
    const { id } = req.params;
    const deletedItem = await eliminarDelCarritoDB(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Artículo no encontrado en el carrito' });
    }

    res.status(200).json({ message: 'Artículo eliminado del carrito', deletedItem });
  } catch (error) {
    next(error);
  }
}

export async function obtenerDetallesDelCarritoCont(req, res, next) {
  try {
    const cartItems = await obtenerDetallesDelCarritoDB();
    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
}
