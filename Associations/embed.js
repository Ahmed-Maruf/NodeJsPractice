
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo');


var PostSchema = new mongoose.Schema({
	title: String,
	content: String
});

var post = mongoose.model('post', PostSchema);

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	post:[PostSchema]
});

var user = mongoose.model('user', userSchema);

/*
var newUser = new user({
	name: 'spider',
	email: 'spider101428@gmail.com'
});

newUser.post.push({
	title: 'My new bike',
	content: 'This is my new bike and I liked it very much'
});

newUser.save(function (err, newuser) {
	if(err){
		console.log(err);
	}
	else{
		console.log(newuser);
	}
});*/


user.find({}, function (err, user) {
	if(err){
		console.log(err);
	}
	else{
		console.log(user[0].name);
	}
});