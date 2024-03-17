//Metodo avanzado de creacion de una API con Node.js usando Express.js y REST
import express, { json } from 'express';//debo instalar express con npm install express
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middleware/cors.js';

const app = express();
app.disable('x-powered-by');//ocultar la cabecera de la aplicación para evitar ataques
app.use(json());//middleware para poder leer el body de las peticiones

//CORS---------------------------------------------------------------------
app.use(corsMiddleware());//usar el middleware de cors

//USE---------------------------------------------------------------------
app.use('/movies', moviesRouter);//usar el router de peliculas

//LISTEN------------------------------------------------------------------
const desiredPort = process.env.PORT || 1234;

app.listen(desiredPort, () => {
    console.log(`Server is running on port http://localhost:${desiredPort}`);
});