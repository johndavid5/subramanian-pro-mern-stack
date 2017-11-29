import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';

import { MongoClient } from 'mongodb';

import Config from '../config';
import logger from '../logger'; // gets log4j...

let appModule = require('./server.js');
let db;
let server;

console.log('Connecting to Mongo URL ', Config.DB_URL, "..." );
MongoClient.connect( Config.DB_URL )
.then( connection => {
  db = connection;
  server = http.createServer();
  appModule.setDb(db);
  server.on('request', appModule.app);
  server.listen( Config.PORT, () => {
    console.log('App started on port ', Config.PORT, "..." );
  });
}).catch(error => {
  console.log('ERROR:', error);
});

if(module.hot){
  // Handling replacement of dependent module...
  module.hot.accept('./server.js', () => {
    server.removeListener('request', appModule.app);
    appModule = require('./server.js'); // eslint-disable-line
    appModule.setDb(db);
    server.on('request', appModule.app);
  });
}
