const net  = require('node:net');

function findAvailablePort(startingPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.listen(startingPort, () => {
        const { port } = server.address();

        server.close(() => {
            console.log(`✅ El puerto ${port} está disponible`);
            resolve(port);
        });

    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.log(`❗ El puerto ${startingPort} está ocupado, buscando otro disponible...`);
            resolve(findAvailablePort(startingPort + 1));
        } else {
            reject(error);
        }
    });

  });
  
}

module.exports = { findAvailablePort };

/*
El propósito principal de este módulo es proporcionar una función llamada findAvailablePort, 
esta busca de manera recursiva un puerto de red disponible para usar, 
empezando desde un puerto inicial especificado (startingPort).
1)Importación del Módulo "net": Utiliza el módulo nativo net de Node.js, 
que proporciona una API asincrónica para la creación de servidores y clientes de red.
Este módulo es esencial para crear un servidor temporal que nos ayuda a comprobar la disponibilidad de puertos.
2)Definición de findAvailablePort:La función findAvailablePort toma un argumento startingPort, 
que es el puerto desde el cual comienza la búsqueda de un puerto disponible.
Retorna una Promise, lo que significa que la función realiza operaciones asincrónicas y 
eventualmente resuelve con el puerto disponible o rechaza con un error.
3)Lógica para Encontrar un Puerto Disponible: Crea un servidor de red temporal usando net.createServer().
Intenta escuchar en startingPort. Si el puerto está disponible, el servidor puede escuchar exitosamente en ese puerto.
Al confirmar la disponibilidad, cierra el servidor temporal y resuelve la promesa con el puerto disponible, 
imprimiendo un mensaje positivo en la consola.
Si se encuentra un error (específicamente, si el código de error es EADDRINUSE, 
lo que indica que el puerto ya está en uso), imprime un mensaje indicando que el puerto actual está ocupado y llama recursivamente a findAvailablePort con el siguiente puerto (startingPort + 1).
Si el error es diferente de EADDRINUSE, rechaza la promesa con el error.
4)Exportación de findAvailablePort:La función findAvailablePort se exporta como una propiedad de un objeto. 
Esto permite que otras partes de tu aplicación o módulos importen y 
utilicen esta función para encontrar puertos disponibles.
*/