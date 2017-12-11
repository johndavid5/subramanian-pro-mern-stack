//import 'babel-polyfill';
//import SourceMapSupport from 'source-map-support';
//SourceMapSupport.install();

//import path from 'path';
import renderedPageRouter from './renderedPageRouter.jsx';
import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import { ObjectId } from 'mongodb';

// const Config = require('../config.js');
// import Config from '../config';

import logger from '../logger'; // gets log4j...

// const Issue = require('./issue');
import Issue from './issue';
import Utils from './utils';


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

// app.get('/favicon.ico', (req, res) => {
//  const sWho = 'app.get("/favicon.ico")';
//  console.log(`${sWho}()...`);
// });

app.get('/api/issues', (req, res) => {

  const sWho = 'app.get("/api/issues")';

  console.log(`${sWho}: req.query = `, req.query);

  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.effort_lte || req.query.effort_gte) {

    filter.effort = {};

  	if (req.query.effort_lte) {
      // parseInt(string, radix) - nota bene: docs suggest
      // to always specify radix, since it's not guaranteed
      // to default to 10.
      filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    }

  	if (req.query.effort_gte) {
      // parseInt(string, radix) - nota bene: docs suggest
      // to always specify radix, since it's not guaranteed
      // to default to 10.
      filter.effort.$gte = parseInt(req.query.effort_gte, 10);
    }
  }

  if( req.query.search ){
    filter.$text = { $search: req.query.search };
  }

  console.log(`${sWho}: filter = `, filter, '...');

  if( req.query._summary === undefined ){
    // Plain old GET of issues...

    // offset defaults to 0 (zero)...
    const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;

    // limit defaults to 20... 
    let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;

    // max limit limited to 50...
    if( limit > 50 ){
      limit = 50;
    }

    let sortBy = req.query._sortby ? req.query._sortby : '_id';

    let ascDesc = req.query._ascdesc ? parseInt(req.query._ascdesc, 10) : 1;

    console.log(`${sWho}(): sortBy = ${sortBy}, ascDesc = ${ascDesc}...`);

    let oSort = {};
    oSort[sortBy] = ascDesc;

    console.log(`${sWho}(): Let off some steam, Bennett!`);

    console.log(`${sWho}: db.collection("issues").find( filter = `, filter, `).sort(`, oSort, `).skip( ${offset} ).limit( ${limit} )...`);

//    let totalCount;
//    
//    db.collection('issues').find(filter).count()
//    .then((count) => {
//      totalCount = count;
//      console.log(`${sWho}: Got totalCount = count = `, totalCount );
//      db.collection('issues').find(filter).sort({_id: 1}).skip(offset).limit(limit).toArray()
//    })
//    .then((issues) => {
//      let sender = {metadata: {totalCount}, records: issues};
//      console.log(`${sWho}: sending JSON to client, metadata = `, sender.metadata);
//      res.json( sender );
//    })
//    .catch((error) => {
//      var message = { message: `Internal Server Error: ${error}` };
//      console.log(`${sWho}: Caught an Exception...Sending Code 500 and JSON `, message, ` to client...`);
//      res.status(500).json(message);
//    });

   // Subramanian's one-liner to get total count -- without skip and limit --
   // and results -- with skip and limit -- all at the same time...
   const cursor = db.collection('issues').find(filter)
    .sort(oSort)
    .skip(offset)
    .limit(limit);

   let totalCount;
   // NOTE: cursor.count(false) -- returns total count regardless of skip and limit...
   cursor.count(false) 
   .then(result => {
     totalCount = result;
     console.log(`${sWho}: Got totalCount = result = `, result, `returning cursor.toArray()...` );
     return cursor.toArray();
   })
   .then(issues=>{
     let sender = {metadata: {totalCount}, records: issues};
     console.log(`${sWho}: sending JSON to client, metadata = `, sender.metadata);
     res.json( sender );
   })
   .catch((error) => {
     var le_message = { message: `Internal Server Error: ${error}` };
     console.log(`${sWho}: Sorry, Moe, caught an Exception...sending code 500 and JSON `, le_message, ` to client...`);
     res.status(500).json(le_message);
   });

  } else {
    // Not a plain old GET of issues...
    // ...aggregated report of issues...

    let aggregatee = [
      { $match: filter },
      { $group: { _id: { owner: '$owner', status: '$status'},
                  count: { $sum: 1 },
	            }
      },
    ];

    console.log(`${sWho}: db.collection("issues").aggregate(`, aggregatee, `)...`);

    db.collection('issues').aggregate(
      aggregatee
    ).toArray()
    .then( (results) => {
      const stats = {};
      results.forEach( result => {
        if( !stats[result._id.owner]){
          stats[result._id.owner] = {};
        }
        stats[result._id.owner][result._id.status] = result.count;
      });
      console.log(`${sWho}: Sending to client: stats = `, stats, `...` );
      res.json(stats);
    })
    .catch((error)=> {
        var message = { message: `Internal Server Error: ${error}` };
        console.log(`${sWho}: Caught an Exception...Sending Code 500 and JSON `, message, ` to client...`);
        res.status(500).json(message);
    })
  }

});

app.get('/api/issues/:id', (req, res) => {
  let issueId;

  const sWho = 'app.get("/api/issues/:id")';
  console.log(`${sWho}: req.query = `, req.query);

  try {
    console.log(`${sWho}: SHEMP: Moe, req.params.id= `, req.params.id);
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    console.log(`${sWho}: SHEMP: Sorry, Moe, looks like new ObjectId(req.params.id="${req.params.id}") threw an error: ${error}...`);
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  db.collection('issues').find({ _id: issueId }).limit(1).next()
    .then((issue) => {
      if (!issue) {
    	console.log(`${sWho}: SHEMP: Sorry, Moe, looks like no such issue wit' issueId=${issueId}`);
        res.status(404).json({ message: `No such issue: ${issueId}` });
      } else {
    	console.log(`${sWho}: SHEMP: Got dhis issue from DB, Moe: `, issue);
        res.json(issue);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
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
    // Equivalent of these two calls...
    // ...Can you spell C-H-A-I-N-I-N-G, Doc-tor Cy-a-nide...?
    // res.status(422);
    // res.json(oMessage);

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

app.put('/api/issues/:id', (req, res) => {
  const sWho = 'app.put(\'/api/issues/:id\')';

  logger.info(`${sWho}(): req.params.id = `, req.params.id);

  let issueId;

  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    const oMessage = { message: `Invalid issue ID format: ${error}` };

    logger.info(`${sWho}(): Sorry, Moe, trouble formin' ObjectId, sendin' back code 422 widh json `, oMessage, '...');

    res.status(422).json(oMessage);
    return;
  }

  logger.info(`${sWho}(): issueId = `, issueId);

  const issue = req.body;
  delete issue._id;

  logger.info(`${sWho}(): issue from req.body, stripped of _id = `, issue);

  const err = Issue.validateIssue(issue);
  if (err) {
    const oMessage = { message: `Invalid request: ${err}` };
    logger.info(`${sWho}(): Sorry, Moe, trouble wid' Issue.validateIssue() sendin' back code 422 wid' json `, oMessage, '...');
    res.status(422).json(oMessage);
    return;
  }

  const issueConverted = Issue.convertIssue(issue);

  logger.info(`${sWho}(): issueConverted = `, issueConverted);

  logger.info(`${sWho}(): Callin' db.collection('issues').update(_id: `, issueId, ', issueConverted )...');

  db.collection('issues').update({ _id: issueId }, issueConverted)
    .then(() => db.collection('issues').find({ _id: issueId }).limit(1).next())
    .then((savedIssue) => {
      // for( let field in savedIssue ){
      //  logger.info(`${sWho}(): savedIssue["${field}"] = `, savedIssue[field], `, typeof(savedIssue["${field}"]) = `, typeof(savedIssue[field]), `, savedIssue[${field}].constructor.name = `, savedIssue[field].constructor.name );
      // }
      // logger.info(`${sWho}(): savedIssue.created = `, savedIssue.created, `, typeof(savedIssue.created) = `, typeof(savedIssue.created ) );
      // logger.info(`${sWho}(): savedIssue.completionDate = `, savedIssue.completionDate, `, typeof(savedIssue.completionDate) = `, typeof(savedIssue.completionDate ) );

      //logger.debug(`${sWho}(): Utils.objectToString(savedIssue):\n`, Utils.objectToString(savedIssue, 'savedIssue'));

      logger.info(`${sWho}(): Sending JSON to client: savedIssue (retrieved from DB) = `, savedIssue);

      res.json(savedIssue);
    })
    .catch((error) => {
      const oMessage = { message: `Internal Server Error: ${error}` };

      logger.error(`${sWho}(): error with database, sending code 500 and JSON `, oMessage);
      res.status(500).json(oMessage);
    });
});/* app.put('/api/issues/:id' */

app.delete('/api/issues/:id', (req, res) => {
  const sWho = "app.delete('/api/issues/:id')";

  let issueId;

  logger.info(`${sWho}(): req.params.id = `, req.params.id);

  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    const oMessage = { message: `Invalid issue ID format: ${error}` };
    logger.error(`${sWho}(): Returning code 422 with JSON `, oMessage);
    res.status(422).json(oMessage);
    return;
  }

  db.collection('issues').deleteOne({ _id: issueId })
    .then((deleteResult) => {
      if (deleteResult.result.n === 1) {
        const oMessage = { status: 'OK' };
        logger.info(`${sWho}(): Returning JSON `, oMessage);
        res.json(oMessage);
      } else {
      // Not an error if no delete occurred because the DELETE
      // "contract" is that the item should not longer exist, and
      // that is still true if the item did not exist...but, just to
      // be nice, we can send a subtle warning...
        const oMessage = { status: 'Warning: object not found' };
        logger.warn(`${sWho}(): Returning JSON `, oMessage);
        res.json(oMessage);
      }
    })
    .catch((error) => {
      const oMessage = { message: `Internal Server Error: ${error}` };
      logger.error(`${sWho}(): Returning code 500 with JSON `, oMessage);
    });
});


//console.log("I'll be back, Bennett!");
//console.log("Let off some steam, Bennett!");
//console.log("No chance...!");

app.use('/', renderedPageRouter);


function setDb(newDb){
  db = newDb;
}

export { app, setDb };
