import mongoose from "mongoose";
import Logger from "../utils/logger.js";
import Pastel from "../models/Producto.js"; // Importa el modelo de Pastel

//* Crear un nuevo pastel
export async function createPastel(req, res, next) {
    try {
        const existingPastel = await Pastel.findOne({
            nombre: req.body.nombre,
        });

        if (existingPastel) {
            return res.status(400).json({
                message:
                    "Ya existe un pastel con este nombre. Por favor, elija otro nombre.",
            });
        } else {
            const pastel = new Pastel(req.body);

            Logger.warn(JSON.stringify(req.body));

            const createdPastel = await pastel.save();

            Logger.warn(JSON.stringify(createdPastel));

            return res.status(201).send(createdPastel);
        }
    } catch (error) {
        next(error);
    }
}

//* Actualizar un pastel existente
export async function updatePastel(req, res, next) {
    try {
        const { id } = req.params;

        const pastel = await Pastel.findById(id);

        if (!pastel) {
            return res.status(404).send({ message: "Pastel no encontrado." });
        }

        Object.assign(pastel, req.body);

        const updatedPastel = await pastel.save();

        return res.status(200).send(updatedPastel);
    } catch (error) {
        next(error);
    }
}

//* Eliminar un pastel
export async function deletePastel(req, res, next) {
    try {
        const { id } = req.params;

        const deletedPastel = await Pastel.findByIdAndDelete(id);

        if (!deletedPastel) {
            return res.status(404).send({ message: "Pastel no encontrado" });
        }

        return res.status(200).send(deletedPastel);
    } catch (error) {
        next(error);
    }
}

//* Buscar pasteles basándose en criterios específicos
export async function searchPasteles(req, res, next) {
    try {
        const searchCriteria = req.query;

        const results = await Pastel.find(searchCriteria);

        return res.send(results);
    } catch (error) {
        next(error);
    }
}

//* Obtener lista paginada de pasteles
export async function getPasteles(req, res, next) {
    try {
        let page = parseInt(req.query.page) || 1;
        if (page < 1) {
            return res.status(400).send({
                message:
                    "La página solicitada no es válida. Por favor, selecciona una página mayor o igual a 1.",
            });
        }

        const pageSize = 8;
        const skip = (page - 1) * pageSize;
        const total = await Pastel.countDocuments();
        const totalPages = Math.ceil(total / pageSize);

        if (page > totalPages && totalPages > 0) {
            return res.status(404).send({
                message:
                    "No hay pasteles en la página solicitada. Por favor, vuelve a una página anterior.",
            });
        }

        const results = await Pastel.find().skip(skip).limit(pageSize);

        if (results.length === 0 && page === 1) {
            return res.send({ message: "No hay pasteles disponibles." });
        }

        return res.send({
            total,
            totalPages,
            page,
            pageSize,
            data: results,
        });
    } catch (error) {
        next(error);
    }
}
