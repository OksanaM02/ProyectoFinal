import mongoose from "mongoose";
import Compra from "../models/Carrito.js";
import Pastel from "../models/Producto.js"; // Ahora importamos el modelo de Pastel
import User from "../models/User.js";
import Logger from "../utils/logger.js";

// Añadir un pastel al carrito
export async function addItemAlCarrito(req, res) {
    const { pastelId, cantidad } = req.body;

    // Verificar si el pastelId existe
    try {
        const pastel = await Pastel.findById(pastelId);
        if (!pastel) {
            return res
                .status(404)
                .json({ message: "El pastel con esta ID no existe." });
        }
        const usuario = await User.findOne({ username: req.user.username });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        let compra = await Compra.findOne({ user: usuario._id });

        if (!compra) {
            compra = new Compra({
                user: usuario._id,
                nombreUsuario: usuario.username,
                items: [{ item: pastelId, cantidad }],
            });
        } else {
            const itemIndex = compra.items.findIndex((item) =>
                item.item.equals(pastelId)
            );
            if (itemIndex > -1) {
                compra.items[itemIndex].cantidad += cantidad;
            } else {
                compra.items.push({ item: pastelId, cantidad });
            }
        }

        await compra.save();
        res.status(200).json(compra);
    } catch (error) {
        Logger.error("Error al añadir item al carrito: ", error);
        res.status(500).json({ message: "Error al añadir item al carrito" });
    }
}

// Obtener el carrito de compras de un usuario
export async function obtenerCarrito(req, res) {
    const userId = req.user.id;

    try {
        const compra = await Compra.findOne({ user: userId }).populate({
            path: "items.item",
            select: "precio foto nombre", // Asegurarse de incluir aquí todos los campos que necesitas
        });

        if (!compra) {
            res.status(404).json({ message: "Carrito no encontrado" });
        } else {
            let precioTotal = 0;
            for (const item of compra.items) {
                precioTotal += item.cantidad * item.item.precio;
            }
            compra.precioTotal = precioTotal;

            res.status(200).json(compra);
        }
    } catch (error) {
        Logger.error("Error al obtener el carrito: ", error);
        res.status(500).json({ message: "Error al obtener el carrito" });
    }
}

// Actualizar la cantidad de un ítem en el carrito
export async function actualizarCantidadItem(req, res) {
    const userId = req.user.id;
    const { pastelId, cantidad } = req.body;

    try {
        const compra = await Compra.findOne({ user: userId });

        if (compra) {
            const item = compra.items.find((item) =>
                item.item.equals(pastelId)
            );
            if (item) {
                item.cantidad = cantidad;
                await compra.save();
                res.status(200).json(compra);
            } else {
                res.status(404).json({
                    message: "Ítem no encontrado en el carrito",
                });
            }
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        Logger.error("Error al actualizar cantidad del ítem: ", error);
        res.status(500).json({
            message: "Error al actualizar cantidad del ítem",
        });
    }
}

// Eliminar un ítem del carrito
export async function eliminarItemDelCarrito(req, res) {
    const userId = req.user.id;
    const { pastelId } = req.params; // Cambiar a req.params para obtener el pastelId desde la URL

    try {
        // Buscar la compra del usuario
        const compra = await Compra.findOne({ user: userId });

        if (compra) {
            // Encontrar el ítem en el carrito por su _id y eliminarlo
            const itemIndex = compra.items.findIndex(item => item.item.toString() === pastelId);
            if (itemIndex !== -1) {
                compra.items.splice(itemIndex, 1);
                await compra.save();
                res.status(200).json(compra);
            } else {
                res.status(404).json({ message: "Ítem no encontrado en el carrito" });
            }
        } else {
            res.status(404).json({ message: "Carrito no encontrado para este usuario" });
        }
    } catch (error) {
        Logger.error("Error al eliminar ítem del carrito: ", error);
        res.status(500).json({ message: "Error al eliminar ítem del carrito" });
    }
}

// Vaciar el carrito de compras de un usuario
export async function vaciarCarrito(req, res) {
    const userId = req.user.id;

    try {
        const compra = await Compra.findOne({ user: userId });

        if (compra) {
            compra.items = [];
            compra.precioTotal = 0;
            await compra.save();
            res.status(200).json({ message: "Carrito vaciado con éxito." });
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        Logger.error("Error al vaciar el carrito: ", error);
        res.status(500).json({ message: "Error al vaciar el carrito" });
    }
}
