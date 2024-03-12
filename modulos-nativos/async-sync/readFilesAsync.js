//Manera asincrona de leer archivos con el modulo fs de node.js (version "vieja")

const fs = require('node:fs');

console.log('Leyendo el archivo 1...');
fs.readFile('archivo1.txt', 'utf-8', (error, data) => {
    if (error) {
        console.error('Error al leer el archivo');
        return;
    }
    console.log(data);
});

console.log('Mientras puedo hacer otra cosa...');

console.log('Leyendo el archivo 2...');

fs.readFile('archivo2.txt', 'utf-8', (error, data) => {
    if (error) {
        console.error('Error al leer el archivo');
        return;
    }
    console.log(data);
});

//Para leer archivos de manera asincrona se utiliza la funcion readFile.
/*La funcion recibe 3 parametros, el primero es el nombre del archivo, el segundo es el formato en el que se quiere leer el archivo y el tercero es una funcion que recibe dos parametros, 
el primero es un error en caso de que ocurra y el segundo es el contenido del archivo.*/

