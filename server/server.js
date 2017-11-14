import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import { MongoClient, ObjectId } from 'mongodb';

// const Config = require('../config.js');
// const Issue = require('./issue');
import Config from '../config';
import Issue from './issue';
import logger from '../logger'; // gets log4j...

SourceMapSupport.install();

// throw new Error('Test!');

// Instantiate the application...
const app = express();

//  47:3   error  'db' was used before it was defined                no-use-before-define
let db = null;

// JDA 2017-10-11: use favicon middleware to serve up the favicon.
// app.use(favicon(`${__dirname}/../public/images/favicon.ico`));
// app.use(favicon(`${__dirname}/../static/images/favicon.ico`));
// Or just fugedaboud foolin' widh dhis crêpe and plop favicon.ico into the ./static folder,
// and let express.static('static') handle it at http://mysite/favicon.ico,
// just like all the other static content...

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
// Oh, JSON, you look pretty...!
app.set('json spaces', 2);

//app.get('/favicon.ico', (req, res) => {
//  const sWho = 'app.get("/favicon.ico")';
//  console.log(`${sWho}()...`);
//});

app.get('/api/issues', (req, res) => {
  const sWho = 'app.get("/api/issues")';

  console.log(`${sWho}: req.query = `, req.query);

  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.effort_lte || req.query.effort_gte ) {
    filter.effort = {};

  	if (req.query.effort_lte){
		// parseInt(string, radix) - nota bene: docs suggest
		// to always specify radix, since it's not guaranteed
		// to default to 10.
		filter.effort.$lte = parseInt(req.query.effort_lte, 10);
	}

  	if (req.query.effort_gte){
		// parseInt(string, radix) - nota bene: docs suggest
		// to always specify radix, since it's not guaranteed
		// to default to 10.
		filter.effort.$gte = parseInt(req.query.effort_gte, 10);
	}
	
  }

  console.log(`${sWho}: db.collection("issues").find( filter = `, filter, ')...');

  db.collection('issues').find(filter).toArray()
    .then((issues) => {
      const metadata = { total_count: issues.length };

      console.log(`${sWho}: sending json, metadata = `, metadata);
      res.json({ _metadata: metadata, records: issues });
    })
    .catch((error) => {
      console.log(`${sWho}: Caught an error: ${error}...Sending Code 500 to client...`);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/issues/:id', (req, res) => {

  let issueId;

  const sWho = 'app.get("/api/issues/:id")';
  console.log(`${sWho}: req.query = `, req.query);

  try {
    console.log(`${sWho}: SHEMP: Moe, req.params.id= `, req.params.id);
    issueId = new ObjectId(req.params.id);
  } catch(error){
    console.log(`${sWho}: SHEMP: Sorry, Moe, looks like new ObjectId(req.params.id="${req.params.id}") threw an error: ${error}...`);
    res.status(422).json({message: `Invalid issue ID format: ${error}`});
    return;
  }

  db.collection('issues').find({_id: issueId}).limit(1).next()
  .then(
    issue=>{
      if( !issue ){
    	console.log(`${sWho}: SHEMP: Sorry, Moe, looks like no such issue wit' issueId=${issueId}`);
        res.status(404).json({message: `No such issue: ${issueId}`});
      }
      else {
    	console.log(`${sWho}: SHEMP: Got dhis issue from DB, Moe: `, issue);
        res.json(issue);
      }
  })
  .catch( error => {
    console.log(error);
    res.status(500).json({message: `Internal Server Error: ${error}`});
  });

});


app.post('/api/issues', (req, res) => {
  // body-parse automagically parsed JSON
  // in Request body, and converted to
  // a Java object...
  const newIssue = req.body;

  const sWho = 'app.post("/api/issues")';

  console.log(`${sWho}: received body = `, req.body);

  // newIssue.id = issues.length + 1;

  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }

  const err = Issue.validateIssue(newIssue);
  if (err) {
    // Error 422: Unprocessable Entity

    const oMessage = { message: `Invalid request: ${err}` };
    const iErrCode = 422;
    console.log(`${sWho}: sending res.status(${iErrCode}) and res.json(`, oMessage, ')');
    res.status(iErrCode).json(oMessage);
    // res.status(422);
    // res.json({message: `Invalid request: ${err}`});

    // For malformed JSON, you can use Error 400: Bad Request,
    // which is more appropriate for a malformed or
    // syntactically incorrect request.
    return;
  }

  const cleanedUpIssue = Issue.cleanupIssue(newIssue);
  console.log("db.collection('issues').insertOne( cleanedUpIssue = ", cleanedUpIssue, ')...');
  db.collection('issues').insertOne(Issue.cleanupIssue(newIssue))
    .then((result) => {
      console.log('result.result =', result.result);
      console.log('result.insertedId =', result.insertedId);
      return db.collection('issues').find({ _id: result.insertedId }).limit(1).next();
    })
    .then((newIssueFromDb) => {
      console.log(`${sWho}: sending res.json(newIssueFromDb = `, newIssueFromDb, ')...');
      res.json(newIssueFromDb);
    })
    .catch((error) => {
      const errResponse = { message: `Internal Server Error: ${error}` };

      console.log(`${sWho}: sending res.status(500).json(`, errResponse, ')...');
      res.status(500).json(errResponse);
    });
}); /* app.post("/api/issues",...) */

// For browser history rather than hash-based
// routing, if we don't match with any of the
// previous routes, always return the same
// page for an SPA: index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});

MongoClient.connect(Config.DB_URL)
  .then((connection) => {
    db = connection;
    app.listen(Config.PORT, () => {
      logger.info(`App started on port ${Config.PORT}`);
    });
  }).catch((error) => {
    logger.error('ERROR:', error);
  });
