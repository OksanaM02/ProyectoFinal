import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const port = 3000;

// Define la ruta al archivo swagger.yaml de manera absoluta
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

app.use(express.static(path.join(__dirname, 'public')));

// Configura Swagger UI para servir la documentación de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.json({ message: 'API Funciona??' });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor listo en http://localhost:${port}`);
});
