

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	posts:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'post'
	}]
});

var user = mongoose.model('user', userSchema);

module.exports = user;