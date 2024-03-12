const http = require('node:http');

const  { findAvailablePort } = require('./free-port.js');

const desiredPort = process.env.PORT ?? 3000;
/*En la terminal, para modificar la variable de entorno PORT, se debe ejecutar el siguiente comando:
*En termina de Powershell: $env:PORT=3000; node http.js
*En terminal de bash: PORT=3000 node http.js
*En terminal de cmd: set PORT=3000 && node http.js*/

const server = http.createServer((req, res) => {
    console.log('request received');
    res.end('Hello World');
});

findAvailablePort(desiredPort)
    .then(port => {
        server.listen(port, () => {
            console.log(`✅ Server listening on port: http://localhost:${port}`);
        });
    })

/*Este aplicacion crea un servidor HTTP básico en Node.js que intenta escuchar en un puerto específico.
Si el puerto deseado está ocupado, busca automáticamente otro puerto disponible para iniciar el servidor.
1) Importación de Módulos: 
Se importan dos módulos nativos de Node.js y un módulo personalizado:
-http: Un módulo de Node.js utilizado para crear servidores HTTP.
.findAvailablePort: Una función importada desde un módulo personalizado (free-port.js) que busca un puerto disponible empezando por el puerto especificado.
2)Establecimiento del Puerto Deseado:
-desiredPort se establece intentando leer la variable de entorno PORT. 
Si PORT no está definido, se utiliza el puerto 4000 por defecto.
3) Creación del Servidor HTTP:
Se crea un servidor HTTP que, al recibir una solicitud, registra un mensaje en la consola ("request received") 
y responde con "Hello World".
4) Búsqueda de Puerto Disponible y Ejecución del Servidor:
Se invoca "findAvailablePort" con el desiredPort. Esta función busca un puerto disponible empezando por el especificado.
Si el puerto deseado está ocupado, incrementa el número del puerto y prueba de nuevo, 
repitiendo el proceso hasta encontrar un puerto libre.
Una vez que se encuentra un puerto disponible, el servidor comienza a escuchar en ese puerto.
Se muestra un mensaje en la consola indicando que el servidor está activo y escuchando, junto con la dirección URL y 
el puerto.*/