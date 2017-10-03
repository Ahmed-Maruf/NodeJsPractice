
var mongoose = require('mongoose');

var campground = require('./models/campground');

var comment = require('./models/comment');

var seed = [{
	name: 'Ahmed Maruf',
	image: 'https://farm5.staticflickr.com/4028/4579115372_7b0b2a35ee.jpg',
	description: 'This is the seed data'
},{
	name: 'Ahmed Maruf',
	image: 'https://farm5.staticflickr.com/4028/4579115372_7b0b2a35ee.jpg',
	description: 'This is the seed data'
},{
	name: 'Ahmed Maruf',
	image: 'https://farm5.staticflickr.com/4028/4579115372_7b0b2a35ee.jpg',
	description: 'This is the seed data This is the seed data This is the seed dataThis is the seed data This is the seed data' +
	'This is the seed dataThis is the seed dataThis is the seed dataThis is the seed dataThis is the seed data'
}];

function seedDb() {
	campground.remove({},function (err) {
		if(err){
			console.log(err);
		}
		else{
			console.log('Data removed!!!!');
		}
		seed.forEach(function (data) {
			campground.create(data,function (err, data) {
				if(err){
					console.log('I am in the error stage'+ err);
				}
				else{
					console.log('Data is added');

					comment.create({
						text: 'This is my first commnet',
						author: 'Ahmed Maruf'
					},function (err, comment) {
						if(err){
							console.log('I am in the comment stage');
						}
						else{
							data.comments.push(comment);
							data.save();
							console.log('new comments created');
						}
					});
				}
			});
		});
	});
}

module.exports = seedDb;