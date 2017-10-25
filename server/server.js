const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const Config = require('../config.js');
const Issue = require('./issue');

// Instantiate the application...
const app = express();

// JDA 2017-10-11: use favicon middleware to serve up the favicon.
app.use(favicon(__dirname + '/../public/images/favicon.ico'));

// Mount the "static" middleware to serve static web pages
// from the filesystem...
app.use(express.static('static'));

// Mount the bodyParser middleware at the application level
// to parse the request body's JSON and convert it
// to an object, automagically placing it into the
// Request body...
app.use(bodyParser.json());

// Configure for automagic pretty printing
// of JSON to client when you call res.json(output);
app.set('json spaces', 2);


app.get("/api/issues", (req, res) => {

	var sWho = "app.get(\"\/api\/issues\")";

	console.log(`${sWho}: hitting up mongdb for issues...`);

	db.collection("issues").find().toArray()
	.then( issues => {
		const metadata = { total_count: issues.length };

		console.log(`${sWho}: sending json, metadata = `, metadata );
		res.json({_metadata: metadata, records: issues });

	})
	.catch( error => {
		console.log(`${sWho}: Caught an error: ${error}...Sending Code 500 to client...` );
		res.status(500).json({message: `Internal Server Error: ${error}`});
	});
});


app.post("/api/issues", (req, res) => {
	// body-parse automagically parsed JSON 
	// in Request body, and converted to
	// a Java object...
	const newIssue = req.body;

	const sWho = "app.post(\"\/api\/issues\")";

	console.log(`${sWho}: received body = `, req.body );

	//newIssue.id = issues.length + 1;

	newIssue.created = new Date();
	if(!newIssue.status){	
		newIssue.status = "New";
	}

	const err = Issue.validateIssue(newIssue);
	if( err ){
		// Error 422: Unprocessable Entity
		
		const oMessage = { message: `Invalid request: ${err}`};
		const iErrCode = 422;
		console.log(`${sWho}: sending res.status(${iErrCode}) and res.json(`, oMessage, `)`);
		res.status(iErrCode).json(oMessage);
		// res.status(422);	
		// res.json({message: `Invalid request: ${err}`});

		// For malformed JSON, you can use Error 400: Bad Request,
		// which is more appropriate for a malformed or
		// syntactically incorrect request.
		return;
	}

	db.collection("issues").insertOne(newIssue)
	.then( (result) => {
		return db.collection("issues").find({_id: result.insertedId}).limit(1).next();
		}
	)
	.then(newIssue=>{
		console.log(`${sWho}: sending res.json(newIssue = `, newIssue, `)...`);
		res.json(newIssue);
	})
	.catch(error => {
		var err_response = {message: `Internal Server Error: ${error}`};

		console.log(`${sWho}: sending res.status(500).json(`, err_response, `)...`);
		res.status(500).json( err_response );
	});

}); /* app.post("/api/issues",...) */

let db;
MongoClient.connect(Config.DB_URL)
.then(
	connection => {
		db = connection;
		app.listen(Config.PORT, ()=>{
			console.log("App started on port " + Config.PORT);
		});
}).catch(error => {
	console.log("ERROR:", error);
});
