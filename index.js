// implement your API here
require('dotenv').config();
const http = require('http');
// const hostname = '127.0.0.1'
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);})

// Create all the endpoints here
