'use strict';
const MongoClient = require('mongodb');
const ObjectID = require('mongodb').ObjectID; // use to convert string to ObjectID

function usage(){
	console.log("Usage:");
	console.log("node", ___filename, "<option> -dburl <dburl>");
	console.log(`Where option is one of:
 callbacks  Use the callbacks paradigm.
 promises   Use the Promises paradigm.	
 generator  Use the Generator paradigm.	
 async		Use the async module.` 
	);
}

var fWhich = null;
var DB_URL = "";
if( process.argv.length < 3 ){
	console.log("Incorrect number of arguments");
	usage();
}
else {
	if( process.argv[2] === "callbacks"){
		fWhich = testWithCallbacksParadigm;
	}
	else if( process.argv[2] === "promises"){
		fWhich = testWithPromisesParadigm;
	}
	else if( process.argv[2] === "generator"){
		fWhich = testWithGeneratorParadigm;
	}
	else if( process.argv[2] === "async"){
		fWhich = testWithAsyncModule;
	}
	else {
		console.log("Invalid option:", process.argv[2]);
		usage();
	}
}


for( var i = 3; i < process.argv.length; i++ ){
	if( process.argv[i] == "-dburl" ){
		DB_URL = process.argv[++i];	
	}
}

console.log("DB_URL = \"" + DB_URL + "\"...");
console.log("fWhich.name = \"" + fWhich.name + "\"...");

fWhich();

/**
* As you can see, one problem with this paradigm
* is that it can get deeply nested and complicated,
* depending on the depth of the chain: the result of
* one operation being passed to the next. 
*
* This is often referred to as "callback hell".
*/
function testWithCallbacksParadigm(){
	var sWho = "testWithCallbacksParadigm";
	console.log(sWho + "()...");
	console.log(sWho + "(): Connecting to \"" + DB_URL + "\"...");
	MongoClient.connect(DB_URL, function(err, db){
		db.collection('employees').insertOne({id: 1, name: 'A. Callback'}, function(err, result){
			console.log("Result of insert:", result.insertedId );
			//db.collection('employees').find({id: 1}).toArray(function(err, docs){
			db.collection('employees').find({_id: new ObjectID(result.insertedId)}).toArray(function(err, docs){
				console.log("Result of find:", docs );
				db.close();
			});
		});
	});
}

function testWithPromisesParadigm(){
	var sWho = "testWithPromisesParadigm";
	console.log(sWho + "()...");

	let db;
	console.log(sWho + "(): Connecting to \"" + DB_URL + "\"...");
	MongoClient.connect(DB_URL)
	.then( connection => {
		db = connection;
		return db.collection('employees').insertOne({id: 1, name: "B. Promises"});
	})
	.then( result => {
		//console.log("Result of insert:", result);
		console.log("Result of insert:", result.insertedId);
		//return db.collection('employees').find({id: 1}).toArray();
		return db.collection('employees').find({_id: new ObjectID(result.insertedId)}).toArray();
	})
	.then( docs => {
		console.log("Result of find:", docs);
		db.close();
	})
	.catch(err => {
		console.log("ERROR", err);
	});
}


// Uses  ES2015 generator functions, which 
// can be exited temporarily via yield statements
// and called again.  Between multiple calls, the
// function retains the execution state.  These
// functions are declared using an asterisk after
// the function keyword, like function*()
//
// A module called "co" takes advantage of ES2015
// generators and promises to make asynchronous
// calls look sequential.  It achieves this by
// asking you to sequence the asynchronous calls
// within one function.  Then, the "co" module
// makes multiple calls to this funciton, where 
// each asynchronous step temporarily exits the
// function...
function testWithGeneratorParadigm(){
	var sWho = "testWithGeneratorParadigm";
	console.log(sWho + "()...");

	const co = require('co');

	co(function*(){
		const db = yield MongoClient.connect(DB_URL);

		const result = yield db.collection('employees').insertOne({id: 1, name: 'C. Generator'});

		console.log("Result of insert", result.insertedId);

		//const docs = yield db.collection('employees').find({id: 1}).toArray();
		const docs = yield db.collection('employees').find({_id: new ObjectID(result.insertedId)}).toArray();

		console.log("Result of find:", docs);
	
		db.close();
	}).catch(err => {
		console.log("ERROR", err);
	});
}

// This module provides a method called
// "waterfall" which lets you pipe the
// result of one asynchronous call 
// to another.  The method takes
// an array of functions to run.  Each
// function is passed the results of the
// previous function, and a callback
// (which takes an error and results as its
// parameters).  Each function in the array
// must call this callback when it's done.
// The results are passed through as a 
// waterfall from one function to the next,
// that is, the outputs of one are
// passed to the next.
function testWithAsyncModule(){
	var sWho = "testWithAsyncModule";
	console.log(sWho + "()...");

	const async = require('async');
	let db;
	async.waterfall([
		next => {
			MongoClient.connect(DB_URL, next);
		},

		(connection, next) => {
			db = connection;
			db.collection('employees').insertOne({id: 1, name: 'D. Async'}, next);
		},

		(insertResult, next) => {
			console.log("Insert result:", insertResult.insertedId);
			db.collection("employees").find({id: 1}).toArray(next);
		},

		(docs, next) => {
			console.log("Result of find:", docs);
			db.close();
			next(null, "All done");
		},
	], (err, result)=>{
		if(err){
			console.log("ERROR", err);
		}
		else{
			console.log(result);
		}
	});

}/* testWithAsyncModule() */

