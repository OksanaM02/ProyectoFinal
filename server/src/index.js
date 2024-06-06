import app from "./app.js";
import config from "./config.js";

const { port } = config;

app.listen(port, () => {
    console.log(
        `Servidor Listo para peticiones en la ruta: http://localhost:${port}/`
    );
});
