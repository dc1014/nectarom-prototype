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


/* route array 
[
	{
		method: 'GET',
		path: '/authors',
		config: {
			handler: getAuthors

			}
		},

	{
		method: 'POST',
		path: '/authors',
		config: {
			handler: function(request, reply){
				reply('derp');
			}
		}
	}
]

function getAuthors() {

} */ 