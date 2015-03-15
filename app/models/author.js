var Mongoose = require('mongoose'); // for working w/ our database
var Schema = Mongoose.Schema;

var authorSchema = new Schema({
	authorName: { type: String, required: true, trim: true },
	book: { type: String, required: true, trim: true }
	//dateCreated :{type: Date, required:true, default: Date.now}
});

var author = Mongoose.model('author', authorSchema);

module.exports = {
	Author : author
};