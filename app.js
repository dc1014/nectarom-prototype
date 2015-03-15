var Hapi = require('hapi'),
		joi = require('joi'),
		Path = require('path');

global.__base = __dirname + '/';

var routes = require(Path.join(__base, 'routes')); 

//prep mongo
var dbOpts = {
	"url" : "mongodb://localhost:27017/authors",
	"options" : {
		"db" : {
			"native_parser" : false
		}
	}
};


// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
	//ubuntu cannot use local host 
	host: '0.0.0.0',
	port: Number(process.env.port || 8080),
});

server.register({
    register: require('hapi-mongodb'),
    option: dbOpts
}, function(err) {
	if(err) {
		console.log(err);
	}
});

server.route(routes);


/*
//junk data
var authors = [
{
	author: 'vernor vinge',
	book: 'a deepness in the sky'
},
{
	author: 'robert heinlein',
	book: 'the moon is a harsh mistress'
}
];

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
// Start the server
server.start();

server.start(function() {
	console.log("Server running at:", server.info.uri);
});
