import Cart from '../../model/Carrito.js';

export async function agregarAlCarritoDB(product) {
  try {
    // Buscar si el producto ya está en el carrito
    const existingItem = await Cart.findOne({ name: product.name });

    if (existingItem) {
      // Si el producto ya existe en el carrito, aumentar la cantidad en uno
      existingItem.cantidad += 1;
      const savedItem = await existingItem.save();

      console.log('Cantidad del producto actualizada en el carrito:', savedItem);
      return savedItem;
    } else {
      // Si el producto no existe, crear un nuevo artículo en el carrito
      const newItem = new Cart({
        name: product.name,
        img: product.img,
        cantidad: 1,
        price: product.price
      });

      const savedItem = await newItem.save();
      console.log('Producto guardado en el carrito:', savedItem);
      return savedItem;
    }
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    throw new Error('No se pudo agregar el producto al carrito');
  }
}
export async function eliminarDelCarritoDB(id) {
  try {
    // Buscar el artículo en el carrito por su ID
    const cartItem = await Cart.findById(id);

    // Si el artículo no se encuentra en el carrito, lanzar un error
    if (!cartItem) {
      throw new Error('Artículo no encontrado en el carrito');
    }

    // Si la cantidad del artículo es mayor que uno, reducir la cantidad en uno
    if (cartItem.cantidad > 1) {
      cartItem.cantidad -= 1;
      const updatedItem = await cartItem.save();
      return updatedItem;
    } else if (cartItem.cantidad === 1) {
      // Si la cantidad del artículo es igual a uno, reducir la cantidad a cero
      cartItem.cantidad = 0;
      const updatedItem = await cartItem.save();
      return updatedItem;
    } else {
      // Si la cantidad es menor que uno, eliminar el artículo del carrito de la base de datos
      const deletedItem = await Cart.findByIdAndDelete(id);
      return deletedItem;
    }
  } catch (error) {
    throw new Error('No se pudo eliminar el artículo del carrito');
  }
}
export async function obtenerDetallesDelCarritoDB() {
  try {
    const cartItems = await Cart.find();
    return cartItems;
  } catch (error) {
    throw new Error('No se pudieron obtener los detalles del carrito');
  }
}

export async function limpiarCarrito() {
  try {
    await Cart.deleteMany();
  } catch (error) {
    throw new Error('No se pudo limpiar el carrito');
  }
}
