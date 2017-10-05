const express = require('express');
const config = require('./config');

// Instantiate the application...
const app = express();

// Mount the "static" middleware to serve static web pages
// from the filesystem...
app.use(express.static('static'));

app.listen(config.port, function(){
	console.log("App listening on port " + config.port);	
});
