/* templated version of index.html */
export default function template(body, initialState){
  return `<!DOCTYPE HTML>
<html>
<head>
  <meta charset="UTF-8">

  <!-- Tell mobile browser that we know how to handle small screens. -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title>Pro MERN Stack</title>

  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <!--<link rel="icon" href="/static/images/favicon.ico?v=2" />-->

  <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">

  <style>
    .header {
      border-bottom: 1px solid silver;
	  margin-bottom: 20px; 
	  padding: 5px;
      background-color: orange;
    }
    .footer {
      display: table;
      height: 100px;
      width: "50%";
	  padding: 5px;
      /* border-top: 1px solid silver; */
	  /* margin-top: 20px; */
      font-family: Helvetica;
	  font-size: 10px;
      color: grey; /* "All fonts are gray in the dark." */
      /* background-color: green; */
    }
    .footer h5 {
      display: table-cell;
      vertical-align: middle;
      color: blue;
    }

    .footer a {
      color: purple;
    }

    .footer a:hover {
      color: rgb(35,82,124)
    }  

	/*
	* CSS Hack to make entire
	*   <Panel collapsible header="Filter">
    * clickable...
	*/
	.panel-title a { display: block; width: 100%; cursor: pointer }
	</style>
  </head>

  <body>
    <div id="contents">${body}</div>
    <!-- this is where our component will appear -->
    <script>window.__INITIAL_STATE__=${JSON.stringify(initialState)};</script>
	<script src="/vendor.bundle.js"></script>
    <script src="/app.bundle.js"></script>
  </body>
</html>
`;
}
