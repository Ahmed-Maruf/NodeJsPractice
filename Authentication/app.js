
var express 		= require('express'),
	app				= express(),
	mongoose		= require('mongoose'),
	passport 		= require('passport'),
	bodyParser		= require('body-parser'),
	LocalStrategy	= require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	user			= require('./models/user'),
	expressSession  = require('express-session');


mongoose.connect('mongodb://localhost/auth_app',{
	useMongoClient:true
});

app.use(expressSession({
	secret:'Rusty is the best',
	save:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.set('view engine', 'ejs');

/*
===============================================
*/



app.get('/', function (req, res) {
	res.render('home');
});

app.get('/secret', function (req, res) {
	res.render('secret');
});

app.get('/register', function (req, res) {
	res.render('register');
});

app.post('/register', function (req,res) {

	req.body.username;
	req.body.password;
	user.register(new user({username:req.body.username}), req.body.password, function (err, user) {
		if(err){
			console.log(err);
		}
		else {
			passport.authenticate('local')(req, res, function () {
				res.redirect('/secret');
			});
		}
	});
});
app.listen(3000, function () {
	console.log('App has started!!!');
});