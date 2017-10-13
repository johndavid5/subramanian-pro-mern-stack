const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const config = require('./config');

// Instantiate the application...
const app = express();

// JDA 2017-10-11: use favicon middleware to serve up the favicon.
app.use(favicon(__dirname + '/public/images/favicon.ico'));

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

const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravana',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Get rid of Rama.',
  },
  {
    id: 2, status: 'Open', owner: 'Rama',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Get rid of Ravana.',
  },
  {
    id: 3, status: 'Assigned', owner: 'Surpanakha',
    created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
    title: 'Get rid of Sita.',
  },
  {
    id: 4, status: 'Assigned', owner: 'Sita',
    created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
    title: 'Get rid of Surpanakha.',
  },
];

	app.get("/api/issues", (req, res) => {
		const metadata = { total_count: issues.length };

		// In Shorthand:
		//res.json({_metadata: metadata, records: issues});

		console.log("app.get(\"\/api\/issues\"): sending json, metadata = ", metadata );

		// In Longhand:
		res.set("Content-Type", "application/json");	
		var replacer = null;
		var space = 2; // For pretty printing...indent 2 spaces...
		res.send(JSON.stringify({_metadata: metadata, records: issues}, replacer, space));
	});

	app.post("/api/issues", (req, res) => {
		// body-parse automagically parsed JSON 
		// in Request body, and converted to
		// a Java object...
		const newIssue = req.body;
		console.log("app.post(\"\/api\/issues\"): received body = ", req.body );
		newIssue.id = issues.length + 1;
		newIssue.created = new Date();
		if(!newIssue.status){	
			newIssue.status = "New";
		}
		issues.push(newIssue);

		console.log("app.post(\"\/api\/issues\"): sending res = newIssue = ", newIssue );
		res.json(newIssue);
	});

	app.listen(config.port, function(){
		console.log("App listening on port " + config.port);	
	});
