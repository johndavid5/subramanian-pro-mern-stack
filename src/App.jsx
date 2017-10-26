import React from 'react';
import ReactDOM from 'react-dom';

import IssueList from './IssueList.jsx';

const VERSION = "1.2.12";

console.log("**** App.js, VERSION " + VERSION + " ***");
console.log("I'll be back, Bennett!");

const contentNode = document.getElementById('contents');

// Render the component inside the content Node
ReactDOM.render(<IssueList></IssueList>, contentNode);

if(module.hot){
	module.hot.accept();
}

console.log("John...?  How's your arm, John...?");
console.log("Let off some steam, Bennett!");

class IssueHelper {
	static handleNullDate(leDate){
		return ( leDate ? leDate.toDateString(): "" );
	}
}
