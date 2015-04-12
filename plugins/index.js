module.exports = [
	{
		register: require('good'),
  		options: {
  			reporters: [{
    			reporter: require('good-console'),
      		args:[{ log: '*', response: '*' }]
				}]
			}
	},
	
	{
		register: require('moonboots_hapi'),
		options: {
			appPath: '/{p*}',
			moonboots: {
				main: __dirname + '/client/app.js',
				developmentMode: true 
			}
		}
	}
];