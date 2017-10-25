import IssueList from "./IssueList.jsx";

const VERSION = "1.2.11";

console.log("**** App.js, VERSION " + VERSION + " ***");

const contentNode = document.getElementById('contents');

// Render the component inside the content Node
ReactDOM.render(<IssueList></IssueList>, contentNode);

class IssueHelper {
	static handleNullDate(leDate){
		return ( leDate ? leDate.toDateString(): "" );
	}
}
