import cors from 'cors';//debo instalar cors con npm install cors

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com',
    'https://midu.dev'
  ]

export const corsMiddleware = ( { acceptedOriginis = ACCEPTED_ORIGINS } = {} ) => cors({
    origin: (origin, callback) => {
    
        if (acceptedOriginis.includes(origin)) {
          return callback(null, true)
        }
    
        if (!origin) {
          return callback(null, true)
        }
    
        return callback(new Error('Not allowed by CORS'))
      }
})
/*CORS es un mecanismo de seguridad que permite restringir las peticiones que se pueden hacer a un servidor.
Es una medida de seguridad que se implementa en el lado del servidor para evitar que un cliente malicioso pueda hacer peticiones 
a un servidor y obtener información sensible.
Se encarga de manejar las peticiones que se hacen a nuestro servidor y decidir si se aceptan o no.
*/