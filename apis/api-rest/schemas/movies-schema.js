const z = require('zod');//modulo para validar datos, zod es un esquema de validación de datos para JavaScript y TypeScript

const movieSchema = z.object({
    title:z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string'
    }),
    year:z.number().int().min(1888).max(2024),
    director:z.string({
        required_error: 'Director is required',
        invalid_type_error: 'Director must be a string'
    }),
    duration:z.number().int().min(1).max(500),
    poster:z.string().url().default('https://via.placeholder.com/150'),
    genre:z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western']),
    {
        required_error: 'Genre is required',
        invalid_type_error: 'Genre must be a string',
        invalid_enum_error: 'Genre must be one of the following: Action, Adventure, Comedy, Drama, Fantasy, Horror, Mystery, Thriller, Western'
    }
    ),
    rate:z.number().int().min(1).max(10).default(5)
});

function validateMovie(movie) {
    return movieSchema.safeParse(movie);
}
/*El metodo safeParse() es una forma segura de validar los datos, 
si los datos no cumplen con el esquema, safeParse() devuelve un objeto con un error y 
el valor de los datos que no cumplen con el esquema.*/

module.exports = { validateMovie };