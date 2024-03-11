import express from 'express';
import { init } from './loaders/index.js';
import config from './config.js';
import { swaggerSpec, swaggerUi } from '../swaggerConfig.js'; // Importa swaggerUi correctamente

const app = express();

init(app, config);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Usa swaggerUi correctamente
export default app;
