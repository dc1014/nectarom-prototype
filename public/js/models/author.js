//can use get set and has after making instance of model

var Author = Backbone.Model.extend({
	defaults: {
		authorName: "",
		book: ""
	},
	initialize: function(){
		console.log('Initialized author model');

		this.on('change:book', function() {
		console.log('Yo, the bookname has changed to.');
		});
	},

	showAlert: function() {
		alert('authorName:' + this.get('authorName'));
	},

	urlRoot: '/authors'
});

/*define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	var AuthorModel = Backbone.Model.extend({
		urlRoot: '/authors'
	});
	var author = new AuthorModel(authorName: 'vernor vinge');
	author.fetch();
	return AuthorModel;
});*/