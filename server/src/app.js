import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath

const app = express();
const port = 3000;

// Obtiene la ruta absoluta al archivo swagger.yaml usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocumentPath = path.resolve(__dirname, '../swagger.yaml');
const swaggerDocument = YAML.load(swaggerDocumentPath);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.json({ message: '¡La API funciona correctamente!' });
});

app.listen(port, () => {
    console.log(`Servidor listo en http://localhost:${port}`);
    console.log(`Documentación Swagger disponible en http://localhost:${port}/api-docs`);
});
export default app;
