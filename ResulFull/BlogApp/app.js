/*

====================================

	GENERAL REQUIREMENTS/RULES
====================================

IN blog model we will have

1) title
2) image
3) body
4) Date(created)

*/

/*
=============================================

				REQUIRES
=============================================
*/

var bodyParser = require('body-parser'),
	expressSanitizer = require('express-sanitizer'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),/*for put delete verb*/
	express = require('express'),
	app = express();


/*
=============================================

			DB CONNECTIONS && SCHEMA
=============================================
 */

mongoose.connect('mongodb://localhost/blogapp', {
	useMongoClient: true,
	/* other options */
});


var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{
		type:Date,
		default:Date.now
	}
});

var Blog = mongoose.model('Blog', blogSchema);
/*
======================================
			VIEW ENGINE SETUP
======================================
 */

app.set('view engine', 'ejs');
app.use(express.static('public')); /*For custom stylesheet*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));


/*
================================================
				RESTFUL ROUTES
================================================
*/

app.get('/', function (req, res) {

	res.redirect('/blogs');
});

/*Index Routes*/
app.get('/blogs', function (req, res) {

	Blog.find({}, function (err, blogs) {
		if(err){
			console.log('Error!!');
		}
		else{
			//console.log(blogs);
			res.render('index', {blogs:blogs});
		}
	});
});

/*New Route*/
app.get('/blogs/new', function (req, res) {
	res.render('new');
});

/*Create Route*/
app.post('/blogs', function (req, res) {
	//console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
//	console.log(req.body);
	Blog.create(req.body.blog, function (err, newBlog) {
		if(err){
			res.render('new');
		}
		else{
			res.redirect('/blogs')
		}
	});
});

/*Show details Route*/

app.get('/blogs/:id', function (req, res) {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if(err){
			res.redirect('/blogs');
		}
		else{
			res.render('show', {blog:foundBlog});
		}
	});
});


/*Edit Route*/

app.get('/blogs/:id/edit', function (req, res) {
	
	Blog.findById(req.params.id, function (err, foundBlog) {
		if(err){
			res.redirect('/blogs');
		}
		else{
			res.render('edit', {blog:foundBlog});
		}
	});
});

/*Update Route*/

app.put('/blogs/:id', function (req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
		if(err){
			res.redirect('/blogs');
		}
		else{
			res.redirect('/blogs/'+req.params.id);
		}
	});
});

/*Delete Route*/

app.delete('/blogs/:id', function (req, res) {

	Blog.findByIdAndRemove(req.params.id, function (err) {
		if(err){
			res.redirect('/blogs');
		}
		else{
			res.redirect('/blogs');
		}
	});
});

app.listen(3000,function () {
	console.log('Application has started');
});