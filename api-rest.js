import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use(corsMiddleware())

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

/*
Este archivo es el punto de entrada para la API REST construida con Express.
La aplicación sigue el patrón de diseño MVC (Modelo-Vista-Controlador), aunque en APIs REST,
la "Vista" generalmente se refiere al formato de los datos enviados al cliente, en este caso, JSON.

Funcionalidades:
- Configura Express como el servidor web.
- Utiliza el middleware de Express para parsear el cuerpo de las solicitudes entrantes a JSON.
- Deshabilita la cabecera 'X-Powered-By' por razones de seguridad.
- Define una ruta base '/movies' para todas las operaciones relacionadas con 'movies', delegando
  el manejo de estas rutas al router 'moviesRouter', que importa desde './routes/movies.js'.
- Establece el puerto en el que el servidor debe escuchar, preferentemente desde una variable de entorno
  'PORT', con un valor por defecto de 1234 si no se especifica.
- Inicia el servidor para escuchar en el puerto configurado e imprime un mensaje en la consola.

Notas:
- El middleware CORS está importado pero comentado; podría ser descomentado y utilizado
  para manejar solicitudes de origen cruzado si se requiere en el futuro.
*/
