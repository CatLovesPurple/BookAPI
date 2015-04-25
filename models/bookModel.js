var mongoose = require('mongoose');
var Schema = mongoose.Schema();


var bookSchema = new mongoose.Schema({
	title : String,
	author : String,
	genre : String,
	read:{ type : Boolean, default : false }
});


module.exports = mongoose.model('Book', bookSchema);