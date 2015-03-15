//var Types = require('hapi').Types;

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
]