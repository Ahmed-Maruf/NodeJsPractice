


var mongoose = require('mongoose'),
	post = require('./models/post'),
	user = require('./models/user');

mongoose.connect('mongodb://localhost/blog_app_2');


/*
post.create({
	title: 'My new car 2 ',
	content:'Bla la la la 2'
}, function (err, post) {
	user.findOne({name: 'Ahmed'}, function (err, user) {
		if(err){
			console.log(err);
		}
		else{
			user.posts.push(post);
			user.save(function (err, data) {
				if(err){

				}
				else{
					console.log(data);
				}
			});
		}
	});
});
*/


user.findOne({email:'maruf@gmail.com'}).populate('posts').exec(function (err, user) {
	if(err){

	}
	else{
		console.log(user);
	}
});

/*
user.create({
	name:'Ahmed',
	email:'maruf@gmail.com'
},function (err, user) {
	if(err){
		console.log(err);
	}
	else{
		console.log(user);
	}
});
*/
