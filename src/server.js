require('dotenv').config();
const colors = require('colors');
const http = require('http');
const app = require('./app');

/**   Crear el servidor de express */
const serve = http.createServer(app);

/** ejecutar servidor en el puerto que esta las variables de entorno */
serve.listen(process.env.PORT, () => {
    /** imprimir respuesta de ejecución del servidor */
    console.log(`Servidor corriendo en el puerto`.magenta, `${process.env.PORT}`.cyan);
});