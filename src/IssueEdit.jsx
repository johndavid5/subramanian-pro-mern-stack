import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import NumInput from './NumInput.jsx';
import Utils from './Utils.jsx';

export default class IssueEdit extends React.Component { // eslint-disable-line
  constructor(){
    const sWho = "IssueEdit::constructor";
	console.log(`${sWho}()...`);
    super();
    // Create initial state in constructor with
    // empty string, otherwise React assumes
    // the input fields were uncontrolled components.
    // Then when set to non-null values by the API
    // call, React assumes we've converted an uncontrolled
    // component to a controlled one, and issues a warning.
    this.state = {
        issue: {
        _id: '',
        title: '',
        status: '',
        owner: '',
        effort: null,
        completionDate: '',
        created: '',
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps){
    if(prevProps.params.id !== this.props.params.id){
      this.loadData();
    }
  }

  componentDidMount(){
    this.loadData();
  }

  onChange(event,convertedValue){

    const sWho = "IssueEdit::onChange";

    console.log(`${sWho}(): event.target.name = ${event.target.name}, convertedValue = `, convertedValue, `...`);

    console.log(`${sWho}(): before: this.state.issue = `, this.state.issue );

	// issue becomes a clone of this.state.issue 
    const issue = Object.assign({}, this.state.issue);

	const value = (convertedValue !== undefined )? convertedValue : event.target.value;
	// ...then use "name" property of the form
    // element to assign the proper issue field...
    //issue[event.target.name] = event.target.value;
    issue[event.target.name] = value;

	// ...then use the usual "setState()" to make it happen...
    // ...note that setState() sets the state asynchronously,
    // so supply a callback or use componentDidUpdate() to
	// inspect the state after the setState() request has
    // been satisfied...
    this.setState({issue}, () => {
	    console.log(`${sWho}(): setStateCallback(): this.state.issue = `, this.state.issue );
	});
  }

  loadData(){
    const sWho = "IssueEdit::loadData";
    console.log(`${sWho}()...`);
    fetch(`/api/issues/${this.props.params.id}`)
    .then( response => {
      if(response.ok){ 
        response.json()
        .then( issue => {
          issue.created = new Date(issue.created).toDateString();
          issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate).toDateString():'';
		  // store "effort" as Numeric type rather than string...
          //issue.effort = issue.effort != null ? issue.effort.toString():'';
          this.setState({issue});
		});
      } else {
        response.json()
        .then( error => {
          alert(`Failed to fetch issue: ${error.message}`);
        });
      }
	})
    .catch(err => {
      alert(`Error in fetching data from server: ${err.message}`);
    });
  }

  render() {
    const issue = this.state.issue;
    return (
      <div style={{ paddingBottom: '10px' }}>
        <form>
        ID: {issue._id}
        <br />
        Created: {issue.created}
        <br />
        Status: <select name="status" value={issue.status}
                 onChange={this.onChange}>
                  <option value="New">New</option>
                  <option value="Open">Open</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
                </select>
        <br />
        Owner: <input name="owner" value={issue.owner} onChange={this.onChange} />
        <br />
        Effort: <NumInput size={5} name="effort" value={issue.effort} onChange={this.onChange} />
        <br />
        Completion Date: <input name="completionDate" value={issue.completionDate} onChange={this.onChange} />
        <br />
        Title: <input name="title" size={50} value={issue.title} onChange={this.onChange} />
        <br />
        <button type="submit">Submit</button>
        <br />
        <Link to="/issues">Back to issue list</Link>
        </form>
        {((props,state) => { // Equivalent of Angular ng-if using IIFE()
            /* console.log('IssueEdit: this.props=', props); */
            /* console.log('IssueEdit: this.props.location=', this.props.location); */
            /* console.log('IssueEdit: this.props.location.query=', this.props.location.query); */
            /* console.log('IssueEdit: this.props.location.query.debug=', this.props.location.query.debug); */
            if (Utils.stringToBool(props.location.query.debug)) {
              return (<div>
              <pre>this.state={JSON.stringify(state, null, 2)}</pre>
              <pre>this.props={JSON.stringify(props, null, 2)}</pre>
              </div>
			  );
            }

            return '';
        })(this.props, this.state)}
      </div>
    );
  }
}

IssueEdit.propTypes = {
  params: PropTypes.object.isRequired,
};
