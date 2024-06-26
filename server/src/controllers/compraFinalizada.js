import Compra from "../models/Carrito.js";
import CompraFinalizada from "../models/CompraFinalizada.js";
import Pastel from "../models/Producto.js";
import Logger from "../utils/logger.js";

export async function finalizarCompra(req, res) {
    const userId = req.user.id;

    try {
        const carrito = await Compra.findOne({ user: userId }).populate(
            "items.item"
        );
        if (!carrito || carrito.items.length === 0) {
            Logger.info(`Carrito vacío para el usuario: ${userId}`);
            return res.status(400).json({ message: "El carrito está vacío." });
        }

        let precioTotal = 0;
        const itemsFinalizados = await Promise.all(
            carrito.items.map(async (item) => {
                const pastel = await Pastel.findById(item.item._id);
                if (!pastel) {
                    throw new Error(
                        `Pastel no encontrado con ID: ${item.item._id}`
                    );
                }



                await pastel.save();

                const precio = pastel.precio * item.cantidad;
                precioTotal += precio;
                return {
                    item: item.item._id,
                    cantidad: item.cantidad,
                    nombre: pastel.nombre,
                    precio: precio,
                };
            })
        );

        const compraFinalizada = new CompraFinalizada({
            user: userId,
            nombreUsuario: req.user.username,
            items: itemsFinalizados,
            precioTotal: precioTotal,
        });

        await compraFinalizada.save();
        carrito.items = [];
        await carrito.save();

        Logger.info(`Compra finalizada con éxito para el usuario: ${userId}`);
        res.status(200).json(compraFinalizada);
    } catch (error) {
        Logger.error(
            `Error al finalizar la compra para el usuario: ${userId}`,
            error
        );
        res.status(500).json({
            message: "Error al finalizar la compra",
            error: error.message,
        });
    }
}
export async function obtenerTodasLasCompras(req, res) {
    try {
        const compras = await CompraFinalizada.find().populate(
            "user",
            "nombreUsuario"
        );
        res.status(200).json(compras);
    } catch (error) {
        Logger.error("Error al obtener todas las compras: ", error);
        res.status(500).json({
            message: "Error al obtener todas las compras",
            error: error.message,
        });
    }
}
export async function obtenerComprasPorUsuario(req, res) {
    const userId = req.user.id;
    try {
        const compras = await CompraFinalizada.find({ user: userId }).populate({
            path: "items.item",
            select: "nombreUsuario precio foto nombre",
        });

        compras.forEach((compra) => {
            let precioTotal = 0;
            for (const item of compra.items) {
                precioTotal += item.cantidad * item.item.precio;
            }
            compra.precioTotal = precioTotal;
        });

        res.status(200).json(compras);
        console.log("Buscando compras para el usuario ID:", userId);
    } catch (error) {
        console.error(
            `Error al obtener las compras del usuario ${userId}: `,
            error
        );
        res.status(500).json({
            message: "Error al obtener las compras del usuario",
            error: error.message,
        });
    }
}
export async function obtenerUltimaCompra(req, res) {
    const userId = req.user.id;

    try {
      const ultimaCompra = await CompraFinalizada.findOne({ user: userId })
        .sort({ fechaHora: -1 })
        .populate({
          path: "items.item",
          select: "nombre precio foto",
        });

      if (!ultimaCompra) {
        return res.status(404).json({ message: "No se encontró ninguna compra realizada." });
      }

      let precioTotal = 0;
      for (const item of ultimaCompra.items) {
        precioTotal += item.cantidad * item.item.precio;
      }
      ultimaCompra.precioTotal = precioTotal;

      res.status(200).json(ultimaCompra);
    } catch (error) {
      console.error(`Error al obtener la última compra del usuario ${userId}: `, error);
      res.status(500).json({
        message: "Error al obtener la última compra del usuario",
        error: error.message,
      });
    }
  }
