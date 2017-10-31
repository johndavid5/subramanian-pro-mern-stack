// Does compilation on the fly rather
// than compiling to ./dist from ./server...
require('babel-register')({
  presets: ['node8'],
});

require('./server.js');
