//El async/await es una forma de escribir codigo asincrono de manera sincrona
//El async/await lo que hace es detener la ejecucion de la funcion async hasta que la promesa sea cumplida
/*Las operaciones asíncronas, como la lectura de archivos, no bloquean la ejecución del programa principal.
Cuando utilizas Promise.all y async-await, estas operaciones asincrónicas se realizan en segundo plano,
permitiendo que el programa principal continúe ejecutándose.*/

import { readFile } from 'node:fs/promises';

console.log('Comienzo del programa...');

const promises = [
    readFile('archivo1.txt', 'utf-8'),
    readFile('archivo2.txt', 'utf-8'),
];

Promise.all(promises).then(([text1, text2]) => {
    console.log('Se muestran los archivos leídos...');
    console.log(text1);
    console.log(text2);
});

console.log('Mientras se leen los archivos, el programa continúa...');

console.log('Fin del programa.');
