import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const movies = readJSON('././movies.json')

export class MovieModel {

  // Función para obtener todas las películas o filtrar por género.
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return movies
  }

  // Función para obtener una película específica por su ID.
  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  // Función para crear una nueva película.
  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  // Función para eliminar una película por su ID.
  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  // Función para actualizar una película existente por su ID.
  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}

/*
Este archivo define la clase MovieModel que representa el modelo de datos para las películas en la aplicación, siguiendo el patrón MVC. 
Este modelo interactúa directamente con los datos almacenados en 'movies.json', proporcionando métodos estáticos para operaciones CRUD:
- getAll({ genre }): Devuelve todas las películas o filtra por género si se proporciona uno.
- getById({ id }): Busca y devuelve una película por su ID.
- create({ input }): Añade una nueva película con un ID único generado y los datos proporcionados en 'input'.
- delete({ id }): Elimina una película por su ID y devuelve true si la operación es exitosa.
- update({ id, input }): Actualiza los datos de una película existente por su ID con la información proporcionada en 'input'.
Esta clase abstrae las operaciones sobre la fuente de datos, permitiendo a los controladores interactuar con los datos de películas de manera más sencilla y desacoplada.
*/
