import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('../swagger.yaml')));

app.get('/', (req, res) => {
    res.json({ message: 'API Funciona??' });
});


app.listen(port, () => {
    console.log(`Servidor listo en http://localhost:${port}`);
});
