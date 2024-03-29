//Metodo avanzado de creacion de una API con Node.js usando Express.js y REST

const express = require('express');//debo instalar express con npm install express
const movies = require('./movies.json');//importo el archivo movies.json
const crypto = require('node:crypto');//modulo para encriptar contraseñas
const cors = require('cors');//debo instalar cors con npm install cors
const { validateMovie , validatePartialMovie } = require('./schemas/movies-schema');//importo la funcion de validacion de peliculas

const app = express();
app.disable('x-powered-by');//ocultar la cabecera de la aplicación para evitar ataques
app.use(express.json());//middleware para poder leer el body de las peticiones

//CORS---------------------------------------------------------------------
app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'https://movies.com',
        'https://midu.dev'
      ]
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      }
  
      return callback(new Error('Not allowed by CORS'))
    }
  }))
/*CORS es un mecanismo de seguridad que permite restringir las peticiones que se pueden hacer a un servidor.
Es una medida de seguridad que se implementa en el lado del servidor para evitar que un cliente malicioso pueda hacer peticiones 
a un servidor y obtener información sensible.
Se encarga de manejar las peticiones que se hacen a nuestro servidor y decidir si se aceptan o no.
*/

//GET---------------------------------------------------------------------
app.get('/movies', (req, res) => {
    const { genre } = req.query;//obtengo el parametro "genre" de la url
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(
                g => g.toLowerCase() === genre.toLowerCase()
            )
        );//En esta funcion se filtran las peliculas por genero y se convierten a minusculas tanto el genero como el parametro
        res.json({ movies: filteredMovies });
    }else{
        res.json({ movies });
    }
});//ruta para obtener todas las peliculas o peliculas por genero

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        res.json({ movie });
    } else {
        res.status(404).json({ error: 'movie not found' });
    }
});//ruta para obtener una pelicula por su id

//POST--------------------------------------------------------------------
app.post('/movies', (req, res) => {

    const result = validateMovie(req.body);//valido los datos de la nueva pelicula usando el esquema de validacion

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }//si hay un error en la validacion devuelvo un error 400

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    };

    movies.push(newMovie);//agrego la nueva pelicula al array de peliculas
    res.status(201).json(newMovie);//devuelvo la nueva pelicula usando el codigo 201 de "created"
});//ruta para agregar una pelicula

//DELETE------------------------------------------------------------------
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})


//PATCH-------------------------------------------------------------------
app.patch('/movies/:id', (req, res) => {
    
    const result = validatePartialMovie(req.body);//valido los datos de la pelicula a actualizar usando el esquema de validacion

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }//si hay un error en la validacion devuelvo un error 400

    const { id }= req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'movie not found' });
    }//si no se encuentra la pelicula devuelvo un error 404

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    };

    movies[movieIndex] = updatedMovie;//actualizo la pelicula
    return res.json(updatedMovie);//devuelvo la pelicula actualizada
});//ruta para actualizar una pelicula

//USE---------------------------------------------------------------------
app.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
});//ruta no encontrada

//LISTEN------------------------------------------------------------------
const desiredPort = process.env.PORT || 1234;

app.listen(desiredPort, () => {
    console.log(`Server is running on port http://localhost:${desiredPort}`);
});