var Hapi = require('hapi'),
		Path = require('path'),
		settings = require('config'),
		plugins = require('./plugins'),
		Good = require('good'),
		routes = require('./routes/routes.js'),
		Mongoose = require('mongoose');

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
	host: settings.host,
	port: settings.port
});

module.exports = server;

var setup = function(done){

	//register all plugins
	server.register(plugins, function(err) {
		if (err) {
			throw err;
		}
	});

	//add the routes
	routes.init(server);

	//add the database
	Mongoose.connect(settings.db);

	done();
};

var start = function(){
	server.start(function()  {
		server.log("Server running at:", server.info.uri);
	});
};

setup(function() {
	if(!module.parent) {
		start();
	};
});



