var Path = require('path');

exports.init = function(server) {
	console.log('Loading all routes');

	require(Path.join(__dirname + '/author'))(server);

//serve client app
  server.route({
  method: 'GET',
  path: '/{p*}',
  handler: {
    directory: {
      path: Path.join(__dirname, '../public'),
      listing: false,
      index: true
      }
    }
  });
};