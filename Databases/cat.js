

var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/cat_app', {
	useMongoClient: true,
	/* other options */
});



var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String

});/*Defining a data schema or pattern*/

var cat = mongoose.model('cat', catSchema); /*modeling the database as cat for naming / going to make a collection name as cat*/




// adding a new cat to the db



var bahlul = new cat({
	name: 'Tausiyyyyyf',
	age: 10,
});

bahlul.save(function (err, cat) { /*Saving a data to the database*/
	if(err){
		console.log('Something went wrong!!!' + err);
	}
	else{
		console.log('We are saving ' + cat);
	}
});




// retrive all cats from the db and console.log each one

cat.find({}, function (err, cats) {
	if(err){
		console.log('Data not found '+ err);
	}
	else{
		console.log(cats);
	}
});