import { Router } from 'express'

import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.post('/', MovieController.create)

moviesRouter.get('/:id', MovieController.getById)
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/:id', MovieController.update)

/*
Este archivo define las rutas para la entidad "movies" usando el enrutador de Express.
Se importa el controlador de películas, que contiene la lógica para manejar las solicitudes específicas.
    - GET '/' para obtener todas las películas.
    - POST '/' para crear una nueva película.
    - GET '/:id' para obtener una película por su ID.
    - DELETE '/:id' para eliminar una película por su ID.
    - PATCH '/:id' para actualizar una película existente por su ID.
Esta estructura sigue el patrón MVC, forma parte del componente de Controlador en el patrón MVC, 
pero se enfoca específicamente en el enrutamiento. En un sentido amplio, el sistema de enrutamiento puede ser considerado 
como una extensión o una capa específica dentro del controlador, cuya responsabilidad principal es definir las rutas de la aplicación 
y determinar qué acción del controlador debe ser ejecutada para cada solicitud HTTP.
*/
