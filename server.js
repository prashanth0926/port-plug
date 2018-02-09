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

        return '<html> <head> <style> h1 {color:red;} p {color:blue;} </style> </head> <body> <h1>A heading</h1> <p>A paragraph.</p> <h2>Page code</h2> <textarea id="code"></textarea> </body> <script> var xhr = new XMLHttpRequest(); document.getElementById("code").innerHTML = process(callApi()); function callApi(path, method) { xhr.open(method || "GET", "http://localhost:8000/" + (path || ""), true); xhr.send(); xhr.onreadystatechange = function(e) { if (xhr.readyState == 4 && xhr.status == 200) { return xhr.responseText; } }; } function process(str) { var div = document.createElement("div"); div.innerHTML = str.trim(); return format(div, 0).innerHTML; } function format(node, level) { var indentBefore = new Array(level++ + 1).join(" "), indentAfter = new Array(level - 1).join(" "), textNode; for (var i = 0; i < node.children.length; i++) { textNode = document.createTextNode("\n" + indentBefore); node.insertBefore(textNode, node.children[i]); format(node.children[i], level); if (node.lastElementChild == node.children[i]) { textNode = document.createTextNode("\n" + indentAfter); node.appendChild(textNode); } } return node; } </script> </html>';
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