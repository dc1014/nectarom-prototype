var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
	host: '0.0.0.0',
	port: Number(process.env.port || 8080)
});

// Add the route
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
       reply('hello world');
    }
});

// Start the server
server.start();

server.start(function() {
	console.log("Server running at:", server.info.uri);
});
