const http = require('node:http');

const server = http.createServer((req, res) => {
    console.log('request received');
    res.end('Hello World');
});

server.listen(3000, () => {
    console.log(`Server listening on port: http://localhost:${server.address().port}`);
});

/*El modulo nativo http nos permite crear un servidor web en Node.js. 
En este caso, creamos un servidor que responde con el mensaje "Hello World" a todas las peticiones que recibe.
Para ello, utilizamos el método createServer que recibe un callback con dos parámetros: req y res, 
que representan la petición y la respuesta, respectivamente.
Dentro del callback, mostramos un mensaje en la consola para indicar que se ha recibido una petición y
utilizamos el método end de la respuesta para enviar el mensaje "Hello World" al cliente.
Finalmente, utilizamos el método listen para indicar al servidor que escuche en un puerto específico.
En este caso, utilizamos el valor 0 para que el sistema operativo asigne un puerto disponible automáticamente.
Una vez que el servidor está escuchando, mostramos un mensaje en la consola con el número de puerto asignado.
*/