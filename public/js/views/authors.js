var app = app || {};

app.AuthorsView = Backbone.View.extend({
	el: '#authors',

	initialize: function() {
		this.collection = new app.Authors();		
		this.collection.fetch({reset: true});
		this.render();
		this.listenTo( this.collection, 'add', this.renderAuthor );
		this.listenTo( this.collection, 'reset', this.render );
	},

	render: function() {
		this.collection.each(function( item ) {
			this.renderAuthor(item);
		}, this);
	},

	renderAuthor: function( item ) {
		var authorView = new app.AuthorView({
			model: item
		});
		this.$el.append(authorView.render().el);
	}
});