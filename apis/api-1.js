//Metodo basico de creacion de una API con Node.js
const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if(req.url === '/') {
        res.statusCode = 200;
        res.end('<h1>Welcome to my API</h1>');
    }else if(req.url === '/about') {
        res.statusCode = 200;
        res.end('<h1>About me</h1>');
    
    }else if(req.url === '/imagen.jpg') {
        fs.readFile('./logo.jpg', (err, data) => {
            if(err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/jpg');
                res.end(data);
            }
        });
    }else {
        res.statusCode = 404;
        res.end('<h1>Not Found</h1>');
    }
}

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
    console.log(`Server is running on port http://localhost:${desiredPort}`);
});

/*Este código crea un servidor HTTP básico en Node.js que escucha en un puerto especificado y 
maneja diferentes rutas URL para responder a las solicitudes de los clientes.
1)Importación de Módulos: Utiliza dos módulos nativos de Node.js, http para crear el servidor y fs (FileSystem) 
para leer archivos del sistema de archivos.
2)Establecimiento del Puerto: El puerto en el que el servidor escuchará se determina por la variable de entorno PORT o, 
si esta no está definida, utiliza el puerto 1234 como valor predeterminado.
3)Manejador de Solicitudes processRequest:
-Para cada solicitud recibida, el servidor configura la cabecera de la respuesta para indicar que el contenido 
será text/html con codificación utf-8.
-Si la URL solicitada es "/"", responde con el código de estado HTTP 200 y el mensaje "Welcome to my API",
o si es "/about" para la sección "About me".
-Si la URL solicitada es "/imagen.jpg", intenta leer un archivo llamado "logo.jpg" del sistema de archivos. 
Si hay un error leyendo el archivo (por ejemplo, si el archivo no existe), responde con el código de estado 500 
y el mensaje "Internal Server Error". Si el archivo se lee correctamente, establece el tipo de contenido a "image/jpg" 
y envía el contenido del archivo como la respuesta.
Si la URL solicitada no coincide con ninguna de las anteriores, responde con el código de estado 404 
y el mensaje "Not Found", indicando que la ruta solicitada no existe en el servidor.
4)Creación y Ejecución del Servidor:
-Utiliza http.createServer para crear el servidor, pasando el manejador de solicitudes processRequest para que controle las solicitudes entrantes.
-El servidor comienza a escuchar en el puerto especificado, y se imprime un mensaje en la consola indicando que el 
servidor está en ejecución y escuchando en ese puerto.
Este servidor es un ejemplo básico de cómo manejar diferentes rutas y tipos de contenido en un servidor HTTP 
utilizando Node.js. Es útil para entender los conceptos fundamentales del manejo de solicitudes HTTP, 
la lectura de archivos y la configuración de cabeceras de respuesta. Sin embargo, para un proyecto real, 
podrías considerar usar un marco de trabajo como Express.js, que simplifica aún más el manejo de rutas y 
la gestión de solicitudes.*/