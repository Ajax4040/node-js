//Manera sincrona de leer archivos con el modulo fs de node.js (version "vieja")

const fs = require('node:fs');

console.log('Leyendo el archivo 1...');
const text1 = fs.readFileSync('archivo1.txt', 'utf-8', (error, data) => {
    if (error) {
        console.error('Error al leer el archivo');
        return;
    }
    console.log(data);
});

console.log(text1);

console.log('Leyendo el archivo 2...');
const text2 = fs.readFileSync('archivo2.txt', 'utf-8', (error, data) => {
    if (error) {
        console.error('Error al leer el archivo');
        return;
    }
    console.log(data);
});

console.log(text2);

/*Para leer archivos de manera sincrona se utiliza la funcion readFileSync.
Asyncrono significa que el programa no se detiene a esperar a que se termine de leer 
un archivo para continuar con el resto del programa.
Sincrono significa que el programa se detiene a esperar a que se termine de leer un archivo.
La funcion readFileSync recibe como primer parametro la ruta del archivo que se quiere leer
y como segundo parametro el formato en el que se quiere leer el archivo.
La funcion readFileSync retorna el contenido del archivo leido.
*/