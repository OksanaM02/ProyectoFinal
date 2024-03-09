import {
  createProducto,
  GetProducto,
  eliminarProducto,
  updateProducto
} from '../services/database/Product-db-services.js';

export async function createProductCont(req, res, next) {
  try {
    const product = await createProducto(req.body);
    return res.status(201).send(product);
  } catch (error) {
    next(error);
  }
}

export async function GetProductoCont(req, res, next) {
  try {
    const products = await GetProducto();
    return res.send(products);
  } catch (error) {
    next(error);
  }
}

export async function eliminarProductoCont(req, res, next) {
  try {
    const { id } = req.params;
    let { cantidad } = req.body;

    // Convertir la cantidad a un número
    cantidad = parseFloat(cantidad);

    // Verificar si la cantidad es un número válido mayor que cero
    if (isNaN(cantidad) || cantidad <= 0) {
      throw new Error('La cantidad a eliminar debe ser un número válido mayor que cero');
    }

    const result = await eliminarProducto(id, cantidad);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
}

export async function updateProductoCont(req, res, next) {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProducto(id, req.body);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
