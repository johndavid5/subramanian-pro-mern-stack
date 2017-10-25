
export default class IssueAdd extends React.Component {
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
