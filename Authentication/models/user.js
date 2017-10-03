
var mongoose = require('mongoose');

var passwordLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(passwordLocalMongoose);
module.exports = mongoose.model('user', userSchema);