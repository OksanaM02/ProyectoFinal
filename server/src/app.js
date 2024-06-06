import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { init } from "./loaders/index.js";
import config from "./config.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

init(app, config);
app.get("/", (req, res) => {
    res.json({ message: "API Funciona??" });
});

export default app;