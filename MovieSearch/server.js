
var express = require('express');

var app = express();

var request = require('request');

app.set('view engine', 'ejs');
app.get('/results', function (req,res) {
	res.send('I am in the result mode!!!');
	request('http://www.omdbapi.com/?s=california', function (err, res, body) {
		if(!err && res.statusCode == 200){
			var results = JSON.parse(body);

			/*res.send(results['search'][0]['Title']);*/

			res.render('results');
		}
	});
});
app.listen(3000);