import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const port = 3000;

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.json({ message: 'API Funciona??' });
});

export default app;
