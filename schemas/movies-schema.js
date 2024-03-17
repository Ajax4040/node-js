import { z } from 'zod';

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

export function validateMovie(input) {
    return movieSchema.safeParse(input);
}
/*El metodo safeParse() es una forma segura de validar los datos, 
si los datos no cumplen con el esquema, safeParse() devuelve un objeto con un error y 
el valor de los datos que no cumplen con el esquema.*/

export function validatePartialMovie(input) {
    return movieSchema.partial().safeParse(input);
}
/*El metodo partial() es una forma de validar datos parciales,
es decir, si el objeto que se le pasa como parametro no cumple con el esquema,
solo se validaran los campos que cumplan con el esquema,
los campos que no cumplan con el esquema seran ignorados.*/
