import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Panel, Form, Col } from 'react-bootstrap';

import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import Utils from './Utils.jsx';

export default class IssueEdit extends React.Component { // eslint-disable-line
  constructor() {

    const sWho = 'IssueEdit::constructor';
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
        completionDate: null,
        created: null,
      },
      invalidFields: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.loadData();
    }
  }

  componentDidMount() {
    this.loadData();
  }

  onChange(event, convertedValue) {
    const sWho = 'IssueEdit::onChange';

    console.log(`${sWho}(): event.target.name = ${event.target.name}, convertedValue = `, convertedValue, '...');

    console.log(`${sWho}(): before: this.state.issue = `, this.state.issue);

    // issue becomes a clone of this.state.issue
    const issue = Object.assign({}, this.state.issue);

    const value = (convertedValue !== undefined) ? convertedValue : event.target.value;
    // ...then use "name" property of the form
    // element to assign the proper issue field...
    // issue[event.target.name] = event.target.value;
    issue[event.target.name] = value;

    // ...then use the usual "setState()" to make it happen...
    // ...note that setState() sets the state asynchronously,
    // so supply a callback or use componentDidUpdate() to
    // inspect the state after the setState() request has
    // been satisfied...
    this.setState({ issue }, () => {
	    console.log(`${sWho}(): setStateCallback(): this.state.issue = `, this.state.issue);
    });
  }/* onChange() */

  onValidityChange(event, valid) {
    const sWho = 'IssueEdit::onValidityChange';

    console.log(`${sWho}(): valid = `, valid);

    console.log(`${sWho}(): Before: this.state = `, this.state);

    const invalidFields = Object.assign({}, this.state.invalidFields);
    if (!valid) {
      invalidFields[event.target.name] = true;
    } else {
      delete invalidFields[event.target.name];
    }

    console.log(`${sWho}(): Calling this.setState( { `, invalidFields, '} )...');
    this.setState(
      { invalidFields },
      () => {
    		console.log(`${sWho}(): After: this.state = `, this.state);
      },
    );
  }/* onValidityChange() */

  onSubmit(event) {
    event.preventDefault();

    if (Object.keys(this.state.invalidFields).length !== 0) {
      return;
    }

    fetch(`/api/issues/${this.props.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.issue),
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((updatedIssue) => {
            updatedIssue.created = new Date(updatedIssue.created);

            if (updatedIssue.completionDate) {
              updatedIssue.completionDate = new Date(updatedIssue.completionDate);
            }

            this.setState({ issue: updatedIssue });

            alert('Updated issue successfully.');
          });
      } else {
        response.json()
          .then((error) => {
            alert(`Failed to update issue: ${error.message}`);
          });
      }
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }/* onSubmit() */


  loadData() {
    const sWho = 'IssueEdit::loadData';

    console.log(`${sWho}()...`);

    fetch(`/api/issues/${this.props.params.id}`)
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((issue) => {
              console.log(`${sWho}(): issue as returned by database = `, issue);

              // issue.created = new Date(issue.created).toDateString();
              issue.created = new Date(issue.created);

		  // store "completionDate" as Date rather than string...
              // issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate).toDateString():'';
              issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;

		  // store "effort" as Numeric type rather than string...leave as is coming from database...
              // issue.effort = issue.effort != null ? issue.effort.toString():'';

              console.log(`${sWho}(): issue after massaging = `, issue);

              console.log(`${sWho}(): Before this.setState({issue}), this.state = `, this.state);
              this.setState(
                { issue },
                () => {
                  console.log(`${sWho}(): After this.setState({issue}), this.state = `, this.state);
                },
		  );
            });
        } else {
          response.json()
            .then((error) => {
              alert(`Failed to fetch issue: ${error.message}`);
            });
        }
      })
      .catch((err) => {
        alert(`Error in fetching data from server: ${err.message}`);
      });
  }

  render() {

    const issue = this.state.issue;

    const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null : (<div className="error">Please correct invalid fields before submitting.</div>);

    return (
      <Panel header="Edit Issue">
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>ID</Col>
            <Col sm={9}>
              <FormControl.Static>{issue._id}</FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Created</Col>
            <Col sm={9}>
              <FormControl.Static>
              {issue.created ? issue.created.toDateString() : ''}
              </FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Status</Col>
            <Col sm={9}>
              <FormControl componentClass="select" name="status"
               value={issue.status} onChange={this.onChange}
              >
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Verified">Fixed</option>
                <option value="Closed">Closed</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Owner</Col>
            <Col sm={9}>
              <FormControl name="owner"
               value={issue.owner} onChange={this.onChange}
              </>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Effort</Col>
            <Col sm={9}>
              <FormControl componentClass={NumInput} name="effort"
               value={issue.effort} onChange={this.onChange}
              </>
            </Col>
          </FormGroup>
        </Form>
        {((props, state) => { // Equivalent of Angular ng-if using IIFE()
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
      </Panel>
    );


    return (
      <div style={{ paddingBottom: '10px' }}>
        <form onSubmit={this.onSubmit}>
        ID: {issue._id}
          <br />
        Created: {issue.created ? issue.created.toDateString() : ''}
          <br />
        Status: <select
          name="status"
          value={issue.status}
          onChange={this.onChange}
        >
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
        Completion Date: <DateInput name="completionDate" value={issue.completionDate} onChange={this.onChange} onValidityChange={this.onValidityChange} />
          <br />
        Title: <input name="title" size={50} value={issue.title} onChange={this.onChange} />
          <br />
          {validationMessage}
          <button type="submit">Submit</button>
          <br />
          <Link to="/issues">Back to issue list</Link>
        </form>
        {((props, state) => { // Equivalent of Angular ng-if using IIFE()
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
