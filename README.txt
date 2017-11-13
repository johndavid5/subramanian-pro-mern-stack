Subramanian's Version:
----------------------
https://github.com/vasansr/pro-mern-stack

John's Version:
---------------
https://github.com/johndavid5/subramanian-pro-mern-stack

Pro MERN Stack:
Full Stack Web App Development with Mongo, Express, React, and Node
1st ed. Edition, Kindle Edition
by Vasan Subramanian (Author)
ISBN-13: 978-1484226520
ISBN-10: 1484226526

/* Promises, Promises... */
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
	
/* Fetch API */
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	
/* Link Header for Rest API -- including pagination metadata */
https://developer.github.com/v3/guides/traversing-with-pagination/

For webpack-dev-server with compiling and pushing of new changes:
-----------------------------------------------------------------
1. Run npm run watch in one window. 

2. Run npm run start-hook in another window.

3. Go to http://localhost:8000


For production deployment:
--------------------------
1. Run npm run compile -- this will use webpack to create ./static/app.bundle.js and
./static/vendor.bundle.js from ./src/*.jsx files...

2. Run npm compile-server -- this will compile files in ./server to ./dist.

3. Run npm start -- this will run the server in ./dist/server.js,
   listening on localhost:3000
