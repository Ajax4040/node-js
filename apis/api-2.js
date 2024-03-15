//Metodo avanzado de creacion de una API con Node.js usando Express.js

const express = require('express');//debo instalar express con npm install express
const fs = require('fs');
const app = express();
app.disable('x-powered-by');//ocultar la cabecera de la aplicación para evitar ataques

const desiredPort = process.env.PORT || 1234;

app.use((req, res, next) => {
    console.log('My first middleware');
    console.log('Time: '+new Date().toLocaleString('es-AR'));
    console.log(`${req.method} request for ${req.url}`);
    next();
});//Middleware que registra detalles de cada solicitud

app.get('/', (req, res) => {
    res.send('<h1>Welcome to my API</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About me</h1>');
});

app.get('/imagen.jpg', (req, res) => {
    const path = './logo.jpg';
    fs.readFile(path, (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).contentType('image/jpg').send(data);
        }
    });
});

// Manejador para cualquier otra ruta no definida
app.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
});

app.listen(desiredPort, () => {
    console.log(`Server is running on port http://localhost:${desiredPort}`);
});

/*
Este código utiliza el framework Express.js para crear un servidor HTTP que maneja diferentes rutas URL y tipos de contenido.
1)Express App Creation: En lugar de crear un servidor HTTP manualmente, se usa express().
2)Rutas con Express: Se utilizan los métodos "app.get" para definir rutas para solicitudes GET. 
Express simplifica enormemente el enrutamiento, permitiéndote especificar rutas y sus manejadores directamente con un API claro y conciso.
3)Manejo de Errores y Contenido Estático: Express te permite manejar errores y servir contenido estático de manera más intuitiva.
En este caso, el manejo de la imagen sigue siendo manual para ilustrar cómo servir archivos binarios (como imágenes), 
pero Express tiene middleware para servir archivos estáticos que podrían simplificar aún más esto.
4)Middleware para Rutas No Encontradas: Usamos "app.use" para manejar cualquier ruta no especificada anteriormente, 
devolviendo un 404. Express evalúa las rutas en el orden en que se definen, 
por lo que este manejador captura todas las solicitudes que no coinciden con las rutas definidas anteriormente.
5)Inicio del Servidor: Usamos "app.listen" para iniciar el servidor, especificando el puerto y una función de callback 
que se ejecuta una vez que el servidor está escuchando.
Este código proporciona la misma funcionalidad básica que tu servidor "api-1.js", 
pero con una sintaxis más limpia y legible gracias a las abstracciones que ofrece Express.
*/