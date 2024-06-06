import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import router from "../routes/index.js";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import { morganMiddleware } from "../config/morgan.js";

export default function (server) {

    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(express.static("public"));
    server.use(morganMiddleware);
    server.use(router);
    server.use(errorMiddleware);
}
