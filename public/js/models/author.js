var Author = Backbone.Model.extend({
	
	defaults: {
		authorName: "",
		book: ""
	},

	url : function() {
		return this.id ? '/authors/' + this.id : '/authors';
	}

});

var KassMorgan = new Author({
	authorName: "Kass Morgan",
});

KassMorgan.set({book: "The 100"});

KassMorgan.save();

KassMorgan.get("book");