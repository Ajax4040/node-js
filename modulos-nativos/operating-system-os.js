const os = require('node:os');

console.log('🔸Información del sistema operativo');
console.log('---------------------------------');
console.log('🔸Nombre del sistema operativo:', os.type());
console.log('🔸Versión del sistema operativo:', os.release());
console.log('🔸Memoria total del sistema:', os.totalmem() / 1024 / 1024, 'MB');
console.log('🔸Memoria libre del sistema:', os.freemem() / 1024 / 1024, 'MB');
console.log('🔸Dias prendido:', os.uptime() / 60 / 60 / 24, 'días');
console.log('---------------------------------');
console.log('🔸Información del procesador');
console.log('---------------------------------');
console.log('🔸Arquitectura del procesador:', os.arch());
console.log('🔸Modelo del procesador:', os.cpus()[0].model);
console.log('🔸Velocidad del procesador:', os.cpus()[0].speed, 'MHz');
console.log('🔸Número de núcleos del procesador:', os.cpus().length);
console.log('---------------------------------');
console.log('🔸Información de la red');
console.log('---------------------------------');
console.log('🔸Dirección IP:', os.networkInterfaces());
console.log('---------------------------------');

//Un modulo es un archivo que contiene un conjunto de funciones que puedes importar a tu archivo
//Un modulo nativo de Node es un modulo que ya viene con Node.js
//Ejemplo 1 de un módulo nativo de Node.js uso de "os" (operating system)

