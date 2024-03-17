import { Router } from "express";
import { readJSON } from '../utils.js';
import { randomUUID } from 'node:crypto';//modulo para encriptar contraseñas
import { validateMovie, validatePartialMovie } from '../schemas/movies-schema.js';//importo la funcion de validacion de peliculas
const movies = readJSON('././movies.json');

export const moviesRouter = Router();

//GET---------------------------------------------------------------------
moviesRouter.get('/', (req, res) => {
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
});

moviesRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        res.json({ movie });
    } else {
        res.status(404).json({ error: 'movie not found' });
    }
});

//POST--------------------------------------------------------------------
moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body);//valido los datos de la nueva pelicula usando el esquema de validacion

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }//si hay un error en la validacion devuelvo un error 400

    const newMovie = {
        id: randomUUID(),
        ...result.data
    };

    movies.push(newMovie);//agrego la nueva pelicula al array de peliculas
    res.status(201).json(newMovie);//devuelvo la nueva pelicula usando el codigo 201 de "created"

});

//DELETE------------------------------------------------------------------
moviesRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
  
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }
  
    movies.splice(movieIndex, 1)
  
    return res.json({ message: 'Movie deleted' })
});

//PATCH-------------------------------------------------------------------
moviesRouter.patch('/:id', (req, res) => {
        
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
});