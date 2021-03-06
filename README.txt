Subramanian, Vasan.
Pro MERN Stack: Full Stack Web App Development with Mongo, Express, React, and Node
Apress. Kindle Edition. 

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

/* react-bootstrap */
https://react-bootstrap.github.io
https://react-bootstrap.github.io/components.html

/* React Select - used for Search Bar in Header.jsx...
* look for <Select.Async...>
*/
https://github.com/JedWatson/react-select

/* Using Google Sign-In for Websites */
https://developers.google.com/identity/sign-in/web/
https://developers.google.com/identity/sign-in/web/devconsole-project

Mo. 12/11/2017:
Project Name: "IssueTracker"
"issuetracker-188716"
here is your Client ID:
"350207866638-1togc53vn13tqc3lm25mjvdb4qt6vhhi.apps.googleusercontent.com"
here is your Client Secret:
"afgg1IjF6UcwZ6GhF7eL1kYb"

For webpack-dev-server with compiling and pushing of new changes:
-----------------------------------------------------------------
1. Run npm run watch in one window. 
   (runs webpack-dev-server...listens on port 8000...
    ...connects to the node server on port 3000)

2. Run npm run watch-server

3. Run npm run start

4. Go to http://localhost:8000


Without webpack-dev-server compiling but not pushing
new front-end changes:
-----------------------------------------------------------------
1. Run npm run uwatch in one window. 
   (runs webpack --watch, but not webpack-dev-server)

2. Run npm run watch-server

3. Run npm run start (runs node server on port 3000)

4. Go to http://localhost:3000



For production deployment:
--------------------------
1. Run npm run compile -- this will use webpack to create ./static/app.bundle.js and
./static/vendor.bundle.js from ./src/*.jsx files...

2. Run npm compile-server -- this will compile files in ./server to ./dist.

3. Run npm start -- this will run the server in ./dist/server.js,
   listening on localhost:3000

* NOTE: In addition to running "npm install", right now we are
copying the bootstrap distribution from ./node_modules/boostrap.dist
to ./static/bootstrap, so run "npm run bootstrap-copy" which does

 $ cp -r ./node_modules/bootstrap/dist ./static/bootstrap.

This is for use primarily of the CSS, as the JavaScript is included
in react-boostrap.

  On Linux you could do a soft-link instead:
 $ ln -s ./node_modules/bootstrap/dist ./static/bootstrap.  
  Later on, if we feel like showing off, we can use "webpack" to
insert bootstrap's CSS into the DOM as a <style>...</style> element.

* Also run "npm run react-select-copy" which does

 $ cp -r ./node_modules/react-select/dist ./static/react-select

This is for use primarily of the CSS, as the JavaScript is included
in react-boostrap.

  On Linux you could do a soft-link instead:
 $ ln -s ./node_modules/react-select/dist ./static/react-select.


