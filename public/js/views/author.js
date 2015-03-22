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
});