const VERSION = "1.2.10";

console.log("App.js, VERSION " + VERSION );

const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
	render(){
		return (
			<div>This is a placeholder for the Issue Filter.</div>
		);
	}
}

// For performance reasons, stateless components
// should be written as functions rather than classes.
// The view is a pure function of its props.
//const IssueRow = (props)=>(
const IssueRow = (props)=>{
 	console.log("IssueRow: props = ", props); 
	return (
	<tr>
		<td>{props.issue._id}</td>
		<td>{props.issue.status}</td>
		<td>{props.issue.owner}</td>
		<td>{props.issue.created.toDateString()}</td>
		<td>{props.issue.effort}</td>
		<td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ""}</td>
		<td>{props.issue.title}</td>
	</tr>
	)
}
//);


// For performance reasons, stateless components
// should be written as functions rather than classes.
// The view is a pure function of its props.
function IssueTable(props){

		const issueRows = props.issues.map((issue) => (<IssueRow key={issue._id} issue={issue}/>));

		return (
		<table className="bordered-table">
		  <thead>
		    <tr>
		      <th>Id</th>
		      <th>Status</th>
		      <th>Owner</th>
		      <th>Created</th>
		      <th>Effort</th>
		      <th>Completion Date</th>
		      <th>Title</th>
			</tr>
            </thead>
		  <tbody>{issueRows}</tbody>
		</table>
		);
}


class IssueAdd extends React.Component {
	constructor(){
		super();

		// bind once, re-use many times...
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		var form = document.forms.issueAdd;

		this.props.createIssue({
			owner: form.owner.value,
			title: form.title.value,
			status: 'New',
			created: new Date(),
		});

		// Clear the form for the next input
		form.owner.value = "";
		form.title.value = "";
	}

	handleClear(){
		document.forms.issueAdd.owner.value="";
		document.forms.issueAdd.title.value="";
	}

	handleReset(){
		document.forms.issueAdd.owner.value="Kumbhakarna";
		document.forms.issueAdd.title.value="Get rid of flying monkeys.";
	}

	render(){
		return (
		<div>
			<form name="issueAdd" onSubmit={this.handleSubmit}>	
				<input type="text" name="owner" defaultValue="Kumbhakarna" placeholder="Owner" />
				<input type="text" name="title" defaultValue="Get rid of flying monkeys" placeholder="Title" />
				<button type="submit">Add</button>
				<button onClick={this.handleReset}>Reset</button>
			</form>
		</div>
		);
	}
}


class IssueList extends React.Component {

	constructor(){
		super();

		this.state = { issues: [] };

		// Bind once...re-use multiple times...
		// actually, you must bind it here in 
		// the constructor since it's now being
		// called from another component...
		this.createIssue = this.createIssue.bind(this);
	}

	// A bit like onLoad() in a web page...a React Lifecycle
	// method to indicate that the component is ready...
	// that is, mounted and placed into the DOM... 
	componentDidMount(){
		var sWho = "componentDidMount";
		console.log(`${sWho}: Calling this.loadData()...`);
		this.loadData();
	}

	
	loadData(){
		var sWho = "loadData";

		let url = "/api/issues";

		console.log(sWho + "(): Calling fetch(\"" + url + "\")...\n");

		fetch(url)
		.then( (response)=>{

			console.log(sWho + "(): recievied response = ", response);
			if( response.ok ){
				response.json()
				.then( data => {
					console.log("Total count of records:", data._metadata.total_count );

					data.records.forEach(issue=>{
						// Convert from ISO string to Date object...
						issue.created = new Date(issue.created);
						if( issue.completionDate){
							issue.completionDate = new Date(issue.completionDate);
						}
					});

					this.setState({ issues: data.records });

				});
			}
			else{
				response.json()
				.then(error =>{
					alert("Failed to fetch issues:" + error.message);
				});
			}
		})
		.catch(err => {
			alert("HTTP Error in fetching data from server:", err);
		});

	}/* loadData() */

	createIssue(newIssue){
		// Use Array.slice() to create a shallow copy, meaning
		// it copies references of object elements...and makes
		// copies of primitive elements...
		//
		// const newIssues = this.state.issues.slice();
		// newIssue.id = this.state.issues.length + 1;
		// newIssues.push(newIssue);
		//
		// this.setState({issues: newIssues });

		fetch("/api/issues", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newIssue),			
		})
		.then( response => {
			if( response.ok ){
				response.json()
				.then(updatedIssue=>{
					// Convert ISO 8601 date string to a Date object...
					updatedIssue.created = new Date(updatedIssue.created);
					if( updatedIssue.completionDate ){
						updatedIssue.completionDate = new Date(updatedIssue.completionDate);
					}

					// The concat() method is used to merge two or more
					// arrays. This method does not change the existing arrays, 			// but instead returns a new array.
					const newIssues = this.state.issues.concat(updatedIssue);
					// Remember the state is immutable, so you 
					// cannot make modifications to it...
					// So we use the concat() function of Array
					// which creates a copy of the original array,
					// and therefore is safe.
		
					// When React sees the state being modified
					// via setState(), it triggers a rerendering
					// process for the component, and _all_descendent_
					// components where properties get affected because
					// of the state change.
					this.setState({issues: newIssues});
				});
			}
			else {
				response.json()
				.then(error => {
					alert(`Failed to add issue: ${error.message}`);
				});
			}
		})
		.catch( err => {
			alert("Error in sending data to server: " + 
				err.message
			);
		});
	}/* createIssue() */

	//createTestIssue(){
	//	console.log("createTestIssue()...");
	//	this.createIssue({
	//		status: 'New',
	//		owner: 'Kumbhakarna',
	//		created: new Date(),
	//		title: 'Completion date should be optional'
	//	});
	//}
	
	render(){
		return (
			<div>
			 <h1>Issue Tracker</h1>
			 <IssueFilter />	
			 <hr />
			 <IssueTable issues={this.state.issues}/>	
			 <hr />
			 <IssueAdd createIssue={this.createIssue} />	
			 <hr />
			</div>
		);
	}
}

class IssueHelper {
	static handleNullDate(leDate){
		return ( leDate ? leDate.toDateString(): "" );
	}
}

// Render the component inside the content Node
ReactDOM.render(<IssueList></IssueList>, contentNode);
