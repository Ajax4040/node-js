import { MovieModel } from '../models/local-file-system/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies-schema.js'

export class MovieController {

    // Función para obtener todas las películas o filtrar por género.
    static async getAll (req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        res.json(movies)
  }

    // Función para obtener una película específica por su ID.
    static async getById (req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (movie) return res.json(movie)
        res.status(404).json({ message: 'Movie not found' })
  }

    // Función para crear una nueva película, validando la entrada según el esquema de película.
    static async create (req, res) {
        const result = validateMovie(req.body)

        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMovie = await MovieModel.create({ input: result.data })

        res.status(201).json(newMovie)
  }

    // Función para eliminar una película por su ID.
    static async delete (req, res) {
        const { id } = req.params

        const result = await MovieModel.delete({ id })

        if (result === false) {
        return res.status(404).json({ message: 'Movie not found' })
        }

        return res.json({ message: 'Movie deleted' })
    }

    // Función para actualizar una película existente por su ID, validando la entrada parcial según el esquema de película.
    static async update (req, res) {
        const result = validatePartialMovie(req.body)

        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updatedMovie = await MovieModel.update({ id, input: result.data })

        return res.json(updatedMovie)
    }
}

/*
Este archivo define el controlador MovieController para la entidad "movies", siguiendo el patrón MVC.
Utiliza MovieModel para interactuar con la base de datos o la fuente de datos definida y 
las validaciones de "../schemas/movies-schema.js" para asegurar la integridad de los datos.
Este controlador actúa como la capa intermedia entre el modelo (MovieModel) y las vistas, procesando la lógica de negocios y
las solicitudes de la API.
*/