var Joi = require('joi'),
		Path = require('path'),
		Boom = require('boom'),
		Author = require(Path.join(__dirname, '/../models/author')).Author;


//see http://stackoverflow.com/a/7142924/5210
module.exports = exports = function(server) {
	console.log('Loading author routes');
	exports.index(server);
	exports.create(server);
	exports.show(server);
	exports.update(server);
	exports.remove(server);
};

exports.index = function(server) {

	server.route({ 
		method: 'GET',
		path: '/authors',
		handler: function(request, reply) {
			Author.find({}, function(err, authors) {
				if(!err) {
					reply(authors);
				} else {
					reply(Boom.badImplementation(err));
				}
			});
		}
	});
};

exports.create = function(server) {
	var author;

	server.route({
		method: 'POST',
		path: '/authors',
		handler: function(request, reply) {
			author = new Author();
			author.authorName = request.payload.authorName;
			author.book = request.payload.book;

			author.save(function(err) {
				if(!err) {
					reply(author).created('/authors/' + author._id);
				} else {
					reply(Boom.forbidden(getErrorMessageFrom(err)));
				}
			});
		}
	});
};

exports.show = function (server) {
	server.route({
  	method: 'GET',
    path: '/authors/{id}',
    config: {
    	validate: {
    		params: {
    			id: Joi.string().alphanum().min(5).required()
    		}
    	}
    },
		handler: function (request, reply) {
    	Author.findById(encodeURIComponent(request.params.id), function (err, author) {
      	if (!err && author) {
        	reply(author);
    	    } else if (err) {
          console.log(err);
          reply(Boom.notFound());
					} else {
					reply(Boom.notFound());
	    	}
			});
		}
	})
};

exports.update = function(server) {
	server.route({
		method: 'PUT',
		path: '/authors/{id}',
		config: {
			validate: {
				params: {
					id: Joi.string().alphanum().min(5).required()
				}
			}
		},
		handler: function(request, reply) {
			Author.findById(encodeURIComponent(request.params.id), function(err, author) {
				//refactor to loop through payload?
				if(!err && author) {
					if(request.payload.authorName) {
						author.authorName = request.payload.authorName;
					}
					if(request.payload.book) {
						author.book = request.payload.book ;
					}

					author.save();

					reply(author);
				} else if (err) {
					console.log(err);
					reply(Boom.notFound());
				} else {
					reply(Boom.notFound());
				}
			});
		}
	})
};

exports.remove = function(server) {
	server.route({
		method: 'DELETE',
		path: '/authors/{id}',
		config: {
			validate: {
				params: {
					id: Joi.string().alphanum().min(5).required()
				}
			}
		},
		handler: function(request, reply) {
			Author.findById(encodeURIComponent(request.params.id), function(err, author) {
				if(!err && author) {
					author.remove();
					reply( { message: "Author deleted"});
				} else if(!err) {
					reply(Boom.notFound());
				} else {
					console.log(err);
					reply(Boom.badRequest("Could not delete author"));
				}
			});
		}
	})
};

function getErrorMessageFrom(err) {
    var errorMessage = '';

    if (err.errors) {
        for (var prop in err.errors) {
            if(err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }

    } else {
        errorMessage = err.message;
    }

    return errorMessage;
}