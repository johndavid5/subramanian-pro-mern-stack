const VERSION = "1.1.5";

console.log("App.js, VERSION " + VERSION );

const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
	render(){
		return (
			<div>This is a placeholder for the Issue Filter.</div>
		);
	}
}

class IssueRow extends React.Component {
	render(){
		console.log("IssueRow::render()...");
		//const borderedStyle = {border: "1px solid silver", padding: 4}; // 4 -> 4px
		const issue = this.props.issue;
		return (
			<tr>
				<td>{issue.id}</td>
				<td>{issue.status}</td>
				<td>{issue.owner}</td>
				<td>{issue.created.toDateString()}</td>
				<td>{issue.effort}</td>
				<td>{issue.completionDate?issue.completionDate.toDateString():''}</td>
				<td>{issue.title}</td>
			</tr>
		);
	}
}

class IssueTable extends React.Component {
	render(){
		// ILLYA KURYAKIN: Replace nekulturney inline styles weeth classes, tovarischi...
		//const borderedStyle = {border: "1px solid silver", padding: 6};
		// NAPOLEON SOLO: And map issues JSON prop array to
		// an array of IssueRow's...
		const issueRows = this.props.issues.map(issue=><IssueRow key={issue.id} issue={issue}/>);

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
}

class IssueAdd extends React.Component {
	render(){
		return (
			<div>This is a placeholder for the Issue Add Entry Form.</div>
		);
	}
}

const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravana',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Surpanakha',
    created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
];

class IssueList extends React.Component {

	constructor(){
		super();

		this.state = { issues: [] };

		// More efficient to bind once, and re-use this permanently
		// bound version of createTestIssue...but isn't it more
		// readable to call it createTestIssueBound()...?
		// https://zhenyong.github.io/react/docs/reusable-components.html
		this.createTestIssue = this.createTestIssue.bind(this);

		setTimeout( this.createTestIssue, 2000 );

		// Automatically create test issue in 2 seconds...
		//setTimeout( this.createTestIssue.bind(this), 2000 );

		// Or, use ES2015 arrow function to preserve "this"...
		// or use lexical this, that is pick up this from
		// the surroundings, rather than the caller's this...
		// setTimeout( () => this.createTestIssue(), 2000 );

		// Or use everyone's favorite, old-fashioned hack...
		// use the "self=this" lexically "sealed" into this
		// function's lexical scope...

		// For fun article on closures in loops, see...
		// ...https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures/
		// this is similar to a portion of the "you don't know js scopes and closures"
		// book...

		// var self = this;
		// setTimeout( function(){ self.createTestIssue()}, 2000 );
	}

	// A bit like onLoad() in a web page...a React Lifecycle
	// method to indicate that the component is ready...
	// that is, mounted and placed into the DOM... 
	componentDidMount(){
		console.log("this.loadData()...");
		this.loadData();
	}

	// Simulates an asynchronous AJAX callback...
	loadData(){
		// No need to use bind() since arrow functions
		// use the lexical this...
		setTimeout( ()=>{
			this.setState({issues: issues});
		}, 500 );
	}

	createIssue(newIssue){
		// Use Array.slice() to create a shallow copy...
		// copy references of object elements...make copies
		// of primitive elements...
		const newIssues = this.state.issues.slice();
		newIssue.id = this.state.issues.length + 1;
		newIssues.push(newIssue);
		// When React sees the state being modified
		// via setState(), it triggers a rerendering
		// process for the component, and _all_descendent_
		// components where properties get affected because
		// of the state change.
		this.setState({issues: newIssues });
	}

	createTestIssue(){
		console.log("createTestIssue()...");
		this.createIssue({
			status: 'New',
			owner: 'Kumbhakarna',
			created: new Date(),
			title: 'Completion date should be optional'
		});
	}
	
	render(){
		return (
			<div>
			 <h1>Issue Tracker</h1>
			 <IssueFilter />	
			 <hr />
			 <IssueTable issues={this.state.issues}/>	
			 <button onClick={this.createTestIssue}>Add</button>
			 <hr />
			 <IssueAdd/>	
			 <hr />
			</div>
		);
	}
}

// Render the component inside the content Node
ReactDOM.render(<IssueList></IssueList>, contentNode);
