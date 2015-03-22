define([
    'jquery',
    'underscore',
    'backbone',
    'models/AuthorModel'
], function($, _, Backbone, AuthorModel){
    var AuthorCollection = Backbone.Collection.extend({
        model: AuthorModel,
        url: 'http://localhost:8080/authors'
    });

    return AuthorCollection;

});


/*var app = app || {};

app.Authors = Backbone.Collection.extend({

	model: app.Author,
	url: 'http://127.0.0.1:8080/authors',

	events:{
    'click #add':'addAuthor'
},

addAuthor: function( e ) {
    e.preventDefault();

    var formData = {};

    $( '#addAuthor div' ).children( 'input' ).each( function( i, el ) {
        if( $( el ).val() != '' )
        {
            formData[ el.id ] = $( el ).val();
        }
    });

    this.collection.add( new app.Author( formData ) );
}

});*/