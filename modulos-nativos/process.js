//Ejemplo 1 (En consola ejecutar: 'node process.js uno dos tres')
console.log('🔸 Argumentos que puse en la linea de comandos: ');//sirve para obtener los argumentos de la línea de comandos
console.log(process.argv);
/*
Te regresará un arreglo con: 
[
  'C:\\Program Files\\nodejs\\node.exe'(ruta del ejecutable de Node.js),
  'C:\\Users\\Usuario\\Desktop\\Nodejs\\modulos-nativos\\process.js'(ruta del script que se está ejecutando),
  'uno',
  'dos',
  'tres'
  (argumentos que se pasaron al script)
]*/

//Ejemplo 2
console.log('🔸 Entorno de ejecuccion: ');//sirve para obtener el entorno de ejecución.
console.log(process.env);
//Ejemplo 3
console.log('🔸 Plataforma de ejecuccion: ');//sirve para obtener la plataforma en la que se está ejecutando el script.
console.log(process.platform);
//Ejemplo 4
console.log('🔸 Salida estandar: ');//sirve para obtener la salida estándar, esto es la consola donde se está ejecutando el script.
console.log(process.stdout);

//Modulo nativo process
/*Es un objeto global que provee información y control sobre el proceso de Node.js
Como un objeto global, no es necesario usar require() para acceder a él
Sirve para obtener información sobre el proceso actual, como el entorno, los argumentos de línea de comandos, 
la salida estándar, etc.*/
