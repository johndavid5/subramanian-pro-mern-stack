var log4js = require('log4js');
//var log4js = require('./lib/log4js-node/lib/log4js');

//var util = require('util');

//util.inherits(Log4jsPlus, log4js);

//function Log4jsPlus(){
//	function info(msg){	
//		log4js.call(info, "[" + process.pid	+ "]" + msg );
//	}
//}

// Turn off colors...looks goofy in file...
//log4js.configure({ appenders: [ { type: "console", layout: { type: "basic" } } ], replaceConsole: true })

// replaceConsole:true: ask log4js to hijack calls to console.log
// and replace with calls to logger.info()...
//log4js.configure({ appenders: [ { type: "console" } ], replaceConsole: true })

var logger = log4js.getLogger("node");

// logger.setLevel('INFO');
//logger.setLevel('DEBUG');
logger.level = 'debug';

// Or hijack it yourself...
console.log = logger.info.bind(logger);

//var logger = Log4jsPlus.getLogger();

module.exports = logger;
