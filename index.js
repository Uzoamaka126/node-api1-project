// implement your API here
const http = require('http');
// const hostname = '127.0.0.1'
const port = process.env.PORT || 3300;

const app = require('./app');

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server has been deployed`)
})

// Create all the endpoints here

