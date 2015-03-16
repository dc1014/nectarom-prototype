global.__base = __dirname + '/';

var Hapi = require('hapi'),
		Good = require('good'),
		joi = require('joi'),
		Path = require('path'),
		Mongoose = require('mongoose'),
		routes = require(Path.join(__base, 'app/routes/baseRoutes'));

Mongoose.connect('mongodb://localhost/nectaromPrototype');

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
	//ubuntu cannot use local host 
	host: '0.0.0.0',
	port: Number(process.env.port || 8080),
});

routes.init(server);

//server.route(authorRoutes);

/* using hapi-mongodb plugin
var dbOpts = {
	"url" : "mongodb://localhost:27017/authors",
	"options" : {
		"db" : {
			"native_parser" : false
		}
	}
};

server.register({
    register: require('hapi-mongodb'),
    option: dbOpts
}, function(err) {
	if(err) {
		console.log(err);
	}
}); */


/*
server.route({
	method: 'GET',
	path: '/authors',
	handler: function(request, reply) {
		var db = request.server.plugins['hapi-mongodb'].db;
		db.collection('authors').find().toArray(function (err, doc) {
			reply(doc);
		});
	}
});

server.route({
	method: 'GET',
	path: '/authors/{id}',
	handler: function(request, reply) {
		var db = request.server.plugins['hapi-mongodb'].db;
		var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
		db.collections('authors').findOne({ "_id": new ObjectID(request.params.id)} , function(err, result) {
			if (err) return reply(Hapi.error.internal('Internal MongoDB error, bro', err));
			reply(result);
		});
	}
});

server.route({
	method: 'POST',
	path: '/authors',
	config: {
		handler: function(request, reply) {
			var newAuthor = {
				author: request.payload.author,
				book: request.payload.book
			};
			authors.push(newAuthor);
			reply(authors);
		},

		validate: {
			payload: {
				author: joi.string().required(),
				book: joi.string().required()
			}
		}
	}
});

server.route({
	method: 'DELETE',
	path: '/author/{id}',
	handler: function(request, reply) {
		if (authors.length < request.params.id) {
			return reply('No author found').code(404);
		}
		authors.splice((request.params.id-1), 1);
		reply(true);
	}
});
*/

//good console for logging
server.register({
	register: Good,
  options: {
  	reporters: [{
    	reporter: require('good-console'),
      args:[{ log: '*', response: '*' }]
		}]
	}
}, function (err) {
	if (err) {
  	throw err; // something bad happened loading the plugin
	}

	if(!module.parent) {
		server.start(function() {
			console.log("Server running at:", server.info.uri);
		});
	}
});

module.exports = server;