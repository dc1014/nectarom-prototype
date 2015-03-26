define(function(require) {
	var Backbone = require('Backbone');
	var $ = require('jquery');
	var _ = require('underscore');

	return Backbone.View.extend({
		initialize: function() {
			this.template = _.template($('#authors-template').html());
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			this.$el.html(this.template(this.model.attributes));
		}
	});
})


/*
var AuthorView = Backbone.View.extend({
	render: function(){
		var html = '<h3>' + this.model.get('authorName');
		$(this.el).html(html);
	}
});

var authorView = 
/*
var app = app || {};

app.AuthorVIew = Backbone.View.extend({
	tagName: 'div'
	className: 'authorContainer',
	template: _.template( $( '#authorTemplate').html() ),
	    events: {
        'click .delete': 'deleteAuthor'
    },

 	render: function() {

		//this.el is defined in tagname, $el accesses jquery in html func

		this.$el.html(this.template(this.model.attributes));

		return this;
	},

	deleteAuthor: function() {
  	//Delete model
    this.model.destroy();

    //Delete view
    this.remove();
    },
});*/