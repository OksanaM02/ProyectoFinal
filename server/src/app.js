import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swaggerPath = path.join(__dirname, '../swagger.yaml');

const app = express();
const port = 3000;

const swaggerDocument = YAML.load(swaggerPath);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.json({ message: 'API Funciona??' });
});

app.listen(port, () => {
    console.log(`Servidor listo en http://localhost:${port}`);
});
