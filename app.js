var Hapi = require('hapi'),
		Path = require('path'),
		settings = require('config'),
		plugins = require('./plugins')
		Mongoose = require('mongoose');

Mongoose.connect(settings.db);

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
	host: settings.host,
	port: settings.port
});

var setup = function(done){

	//register all plugins
	server.register(plugins, function(err) {
		if (err) {
			throw err;
		}
			});

};

//do not start server in test env	
if(!module.parent) {
	server.start(function() {
	console.log("Server running at:", server.info.uri);
	});
};

module.exports = server;