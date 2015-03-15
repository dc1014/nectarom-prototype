var Path = require('path');

exports.init = function(server) {
	console.log('Loading all routes');

	require(Path.join(__dirname + '/authorRoutes'))(server);
};

/*
module.exports = [
	{
    method: 'GET',
    path:'/',
    config: {
    	handler: function (request, reply) {
      	reply('hello world');
    	}
  	}
	}
]*/