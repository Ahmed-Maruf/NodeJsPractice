
var express = require('express');
var app = express();

var bodyParser = require('body-parser'); /*for extracting data from db or user input we need to use body-parser always*/

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); /*Telling the view engine all the files type will be ejs*/

var friends = ['Tony', 'Miranda', 'Ahmed', 'Maruf'];
app.get('/', function (req,res) {
	res.render('home');
});


app.get('/friends', function (req, res) {

	res.render('friends', {friendList:friends});

});

app.post('/addFriend', function (req, res) {

	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	res.redirect('/friends');
});

/*Make a api request from node*/

var request = require('request');

request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, res, body) {/*Body is the stuff that came back after request*/

	if(!error && res.statusCode == 200){
		var parsedData = JSON.parse(body); /*need to convert to object from string*/
		console.log('Sunset in Huwaii is at: ')
		console.log(parsedData['query']['results']['channel']['astronomy']['sunset']);
	}
});

app.listen(3000);