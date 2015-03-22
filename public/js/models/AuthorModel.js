define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	var AuthorModel = Backbone.Model.extend({
		url: 'http://localhost:8080/authors'
	});
	return AuthorModel;
});




/*

var app = app || {};
app.Author = Backbone.Model.extend({
	initialize: function(){
		console.log('Author model is initialized');
	},
	defaults: {
		authorName: '',
		book: ''
	}
});*/


