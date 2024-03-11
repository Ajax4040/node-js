/*El módulo nativo "path" en Node.js proporciona utilidades para trabajar con rutas de archivos 
y directorios. Es útil para manipular y construir rutas de manera segura, 
independientemente del sistema operativo.*/

//Ejemplo de uso de la libreria path
const path = require('path');

//Primero por las dudas verificamos la orientacion de las barras segun el sistema operativo
console.log('🔸 Separador de rutas:', path.sep);

//En windows el separador de rutas es \ y en mac y linux es /
//En widnows la ruta de un archivo es C:\Users\Usuario\Documents\archivo.txt
//En mac y linux la ruta de un archivo es /home/usuario/documentos/archivo.txt

//Unir rutas con el metodo join
const filePath = path.join('content', 'subfolder', 'test.txt');

console.log('🔸 Ruta del archivo:', filePath);

//Obtener el nombre del archivo con el metodo basename
const base = path.basename(filePath);
console.log('🔸 Nombre del archivo:', base);

//Obtener la ruta absoluta con el metodo resolve
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log('🔸 Ruta absoluta:', absolute);

//Obtener la extension del archivo con el metodo extname
const ext = path.extname(filePath);
console.log('🔸 Extension del archivo:', ext);

/*Comandos para acceder a los archivos:
1) .\ significa que estamos en el directorio actual
2) ..\ significa que estamos en el directorio padre
3) \ significa que estamos en la raiz del directorio
4) ..\..\ significa que estamos en el directorio padre del directorio padre
5) C:\ significa que estamos en la raiz del disco C*/
