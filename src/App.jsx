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
		const borderedStyle = {border: "1px solid silver", padding: 4}; // 4 -> 4px
		return (
			<tr>
				<td style={borderedStyle}>{this.props.issue_id}</td>
				<td style={borderedStyle}>{this.props.issue_title}</td>
			</tr>
		);
	}
}

class IssueTable extends React.Component {
	render(){
		const borderedStyle = {border: "1px solid silver", padding: 6};
		return (
		<table style={{borderCollapse: "collapse"}}>
              <thead>
		    <tr>
		      <th style={borderedStyle}>Id</th>
		      <th style={borderedStyle}>Title</th>
			</tr>
              </thead>
		  <tbody>
		    <IssueRow issue_id={1} issue_title="Error in console when clicking Add" />	
		    <IssueRow issue_id={2} issue_title="Missing bottom border on panel" />	
		    <IssueRow issue_id={3} issue_title="Let off some steam, Bennett!" />	
		  </tbody>
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

class IssueList extends React.Component {
	render(){
		return (
			<div>
			 <h1>Issue Tracker</h1>
			 <IssueFilter />	
			 <hr />
			 <IssueTable/>	
			 <hr />
			 <IssueAdd/>	
			 <hr />
			</div>
		);
	}
}

// Render the component inside the content Node
ReactDOM.render(<IssueList></IssueList>, contentNode);
