//Ejemplo integrador: Listado de archivos de un directorio

const pc = require('picocolors');//Importamos la librería picocolors para darle color a los mensajes

const fs = require('node:fs/promises');
const path = require('node:path');

const folder = process.argv[2] ?? '.';//Si no se pasa un directorio, se toma el directorio actual

async function ls (folder) {
    let files;
    try {
        files = await fs.readdir(folder);//Obtenemos los archivos del directorio
    } catch (err) {
        //Si el directorio no existe, mostramos un mensaje de error y salimos del programa
        if (err) {
            console.log(pc.red('❗ El directorio no existe'));
            process.exit(1);//Se usa process.exit(1) para terminar el programa con un error
        }
    }

    //Iteramos sobre los archivos del directorio
    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file);//Obtenemos la ruta del archivo
        let stats;
        try {
            stats = await fs.stat(filePath);//Se trata de obtener la información del archivo
        }
        catch (err) {
            console.log(pc.red(`❗ No se pudo obtener información del archivo: ${file}`));
            process.exit(1);//No se puede obtener información del archivo, terminamos el programa con un error
        }

        const isDirectory = stats.isDirectory() ? '📁' : '📄';//Si es un directorio o un archivo
        const size = stats.size.toString().padStart(10);//Tamaño del archivo
        const date = stats.mtime.toLocaleString();//Fecha de modificación del archivo
        
        return `${isDirectory} ${pc.blue(file.padEnd(20))} - ${pc.yellow(size)} bytes, última modificación: ${pc.green(date)}`;//Retornamos la información del archivo
    });

    const filesInfo = await Promise.all(filesPromises);//Esperamos a que todas las promesas se resuelvan
    filesInfo.forEach(fileInfo => console.log(fileInfo));//Mostramos la información de los archivos

}  

ls(folder);
