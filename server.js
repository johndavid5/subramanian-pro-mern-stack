const express = require('express');
const favicon = require('serve-favicon');

const config = require('./config');


// Instantiate the application...
const app = express();

// use favicon middleware to serve up the favicon...
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Mount the "static" middleware to serve static web pages
// from the filesystem...
app.use(express.static('static'));

app.listen(config.port, function(){
	console.log("App listening on port " + config.port);	
});
