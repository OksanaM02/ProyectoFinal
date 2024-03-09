import Product from '../../model/Producto.js';

export async function createProducto(productData) {
  try {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    throw new Error(`Error creando producto: ${error.message}`);
  }
}

export async function GetProducto() {
  const products = await Product.find();
  return products;
}

export async function eliminarProducto(Id, cantidad) {
  try {
    // Verificar si la cantidad es un número válido
    if (isNaN(cantidad) || cantidad <= 0) {
      throw new Error('La cantidad a eliminar debe ser un número válido mayor que cero');
    }

    // Busca el producto por su ID
    const product = await Product.findById(Id);

    // Si no se encuentra el producto, lanza un error
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Verificar si la cantidad del producto es suficiente
    if (product.cantidad < cantidad) {
      throw new Error('La cantidad a eliminar es mayor que la cantidad disponible en el inventario');
    }

    // Resta la cantidad recibida del producto y guarda el cambio en la base de datos
    product.cantidad -= cantidad;
    await product.save();

    return { message: `Se eliminaron ${cantidad} unidades del producto ${product.name}. La cantidad restante es ${product.cantidad}` };
  } catch (error) {
    throw error; // Reenviar el error para que sea manejado en el controlador
  }
}

export async function updateProducto(id, updatedProductData) {
  const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
  if (!updatedProduct) {
    throw new Error('Producto no encontrado');
  }
  return updatedProduct;
}
