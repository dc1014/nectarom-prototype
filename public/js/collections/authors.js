var Authors = Backbone.Collection.extend({
	model: Author,
	url: "/authors"
});

var authors = new Authors;

authors.fetch();