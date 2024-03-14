const http = require('node:http');

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if(req.url === '/') {
        res.statusCode = 200;
        res.end('Welcome to my API');
    }else if(req.url === '/contact') {
        res.statusCode = 200;
        res.end('Contact me at');
    }else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
    console.log(`Server is running on port http://localhost:${desiredPort}`);
});

