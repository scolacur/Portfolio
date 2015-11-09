//Main Application
var express = require('express');
var app = express();

app.get('/', function(req,res){
	res.send('Yoooo');
});

var server  = app.listen(2000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
