//Uso de promesas para leer archivos de manera asincrona con el modulo fs de node.js
/*Las promesas son un objeto que representa la terminacion o el fracaso de una operacion asincrona
Las promesas tienen 3 estados: pendiente, cumplida y rechazada
Las promesas tienen 2 metodos: then y catch
El metodo then recibe una funcion que se ejecutara si la promesa se cumple
El metodo catch recibe una funcion que se ejecutara si la promesa se rechaza
*/

const fs = require('node:fs');
const { promisify } = require('node:util');
const readFile = promisify(fs.readFile);
//ver la version mas actual de promisify en https://nodejs.org/api/util.html#util_util_promisify_original

console.log('Leyendo el archivo 1...');
readFile('archivo1.txt', 'utf-8')
    .then(text => {
        console.log(text);
    })
    .catch(error => {
        console.error('Error al leer el archivo');
    });

console.log('Leyendo el archivo 2...');

readFile('archivo2.txt', 'utf-8')
    .then(text => {
        console.log(text);
    })
    .catch(error => {
        console.error('Error al leer el archivo');
    });

console.log('Mientras puedo hacer otra cosa...');

console.log('Fin del programa.')
