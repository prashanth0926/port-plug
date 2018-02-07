'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({ 
    host: 'localhost', 
    port: 8000
});

// Add the route
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'GET',
    path:'/', 
    handler: function (request, h) {

        return '<html> <head> <style> h1 {color:red;} p {color:blue;} </style> </head> <body> <h1>A heading</h1> <p>A paragraph.</p> </body> </html>';
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();