var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ManSchema   = new Schema({
	name: String,
	age: Number
});

module.exports = mongoose.model('Man', ManSchema);
