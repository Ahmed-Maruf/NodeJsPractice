
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var post = mongoose.model('post', postSchema);

module.exports = post;