
/*
ALL THE REQUIRES MODULES
*/
var express 	= require('express'),
	bodyParser  = require('body-parser'),
	mongoose 	= require('mongoose'),
	app 		= express(),
	campground  = require('./models/campground'),
	comment 	= require('./models/comment'),
	seedDb 		= require('./seeds')


app.use(bodyParser.urlencoded({extended: true})); /*Must be defined for using body-parser*/

app.use(express.static(__dirname+ '/public'));
/*Declaring all files type as ejs for this application*/
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/yelp_camp', {/*If already a db exist it will use it or if not exist it will create one*/
	useMongoClient: true
});

seedDb();

/*
* RESTFUL ROUTES
* name 		url			verb		desc
* ==================================================================================
* INDEX		/dogs		GET			Display a list of dog
* NEW 		/dogs/new	GET			Displays form to make a new dog
* CREATE  	/dogs		POST		Add new dog to db
* SHOW		/dogs/:id	GET			Shows info about one specific dog
* */


app.get('/', function (req, res) {/*A call-back function with request and response as objects && root page declaration*/

	res.render('landing');
});

/*Index Route*/
app.get('/campgrounds', function (req, res) {

	// Get all campgrounds form the db

	campground.find({}, function (err, campground) {
		if(err){
			console.log(err);
		}
		else{
			res.render('campgrounds/index', {campgrounds:campground});
			console.log('app.get(index route is working)');
		}
	});
});

/*Create Route*/
app.post('/campgrounds', function (req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;

	var imgae = req.body.image;

	var desc = req.body.description;
	var  newcampGround = {name:name, image:imgae, description:desc};
//	console.log(newcampGround);

	campground.create(newcampGround, function (err, campground) {
		if(err){
			console.log(err);
		}
		else{
			// redirect back to campgrounds page!!!!
			res.redirect('/campgrounds')
		}
	});
});


/*New - show form to create new campground*/
app.get('/campgrounds/new', function (req , res) {
	res.render('campgrounds/new');
});


/*Show a specific Route*/

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

/*Comments Routes*/

app.get('/campgrounds/:id/comments/new', function (req, res) {

	campground.findById(req.params.id, function (err, campground) {
		if(err){
			console.log(err);
		}
		else {
			console.log(campground.name);
			res.render('comments/new', {campground:campground});
		}
	});
});


app.post('/campgrounds/:id/comments', function (req, res) {
	//lookup camgrround using id
	campground.findById(req.params.id, function (err, campground) {
		if(err){
			res.redirect('/campgrounds');
		}
		else{
			comment.create(req.body.comment, function (err, comment) {
				if(err){
					console.log(err);
				}
				else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+campground._id);
				}
			})
		}
	});
	//create new comment

	//connect new comment to campground

	//redirect
});
/*For starting the application at a specific port (must be defined)*/
app.listen(3000, function () {
	console.log('Application has started!!!');
});