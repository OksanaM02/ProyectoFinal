import mongoose from "mongoose";
import Compra from "../models/Carrito.js";
import Pastel from "../models/Producto.js";
import User from "../models/User.js";
import Logger from "../utils/logger.js";


export async function addItemAlCarrito(req, res) {
    const { pastelId, cantidad } = req.body;


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

export async function obtenerCarrito(req, res) {
    const userId = req.user.id;

    try {
        const compra = await Compra.findOne({ user: userId }).populate({
            path: "items.item",
            select: "precio foto nombre",
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

export async function eliminarItemDelCarrito(req, res) {
    const userId = req.user.id;
    const { pastelId } = req.body;

    try {
        const compra = await Compra.findOne({ user: userId });

        if (compra) {
            compra.items = compra.items.filter(
                (item) => item.item.toString() !== pastelId
            );
            await compra.save();
            res.status(200).json(compra);
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        Logger.error("Error al eliminar ítem del carrito: ", error);
        res.status(500).json({ message: "Error al eliminar ítem del carrito" });
    }
}

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
