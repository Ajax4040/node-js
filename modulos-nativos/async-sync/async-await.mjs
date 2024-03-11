//El await detiene la ejecucion de la funcion async hasta que la promesa sea cumplida
//Si usamos await en un archivo con extension .mjs, se puede usar el await en el nivel superior del archivo o el cuerpo

import { readFile } from 'node:fs/promises';

console.log('Leyendo el archivo 1...');

const text1 = await readFile('archivo1.txt', 'utf-8');
console.log(text1);

console.log('Aquí puedo hacer otra cosa...');

console.log('Leyendo el archivo 2...');
const text2 = await readFile('archivo2.txt', 'utf-8');
console.log(text2);

console.log('Aquí puedo hacer otra cosa...');

console.log('Fin del programa.');
