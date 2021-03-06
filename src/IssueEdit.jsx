import React from 'react';
import PropTypes from 'prop-types';

import { LinkContainer } from 'react-router-bootstrap';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Panel, Form, Col, Alert } from 'react-bootstrap';

import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
//import Toast from './Toast.jsx';
import withToast from './withToast.jsx'; 
import Utils from './Utils.jsx';

class IssueEdit extends React.Component { // eslint-disable-line

  static dataFetcher({params, urlBase}){
    return fetch(`${urlBase||''}/api/issues/${params.id}`)
    .then( response => {
      if(!response.ok){ 
        return response.json()
        .then( error => Promise.reject(error) );
      }

      return response.json()
      .then( data =>
         ({ IssueEdit: data })
      );
    });

  }

  constructor(props, context) {

    const sWho = 'IssueEdit::constructor';
    console.log(`${sWho}()...`);

    super(props, context);

    let issue;

    if(context.initialState.IssueEdit){
      issue = context.initialState.IssueEdit;
      issue.created = new Date(issue.created);
      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate): null;
    }
    else {
      issue = {
        _id: '',
		title: '',
	    status: '',
        owner: '',
        effort: null,
        completionDate: null,
	    created: null,
      };
    }

    this.state = {
      issue, // shorthand for issue: issue
      invalidFields: {},
      showingValidation: false,
    };

    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);

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

  showValidation(){
    this.setState({showingValidation: true});
  }

  dismissValidation(){
    this.setState({showingValidation: false});
  }

  onSubmit(event) {

    event.preventDefault();
    this.showValidation();

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
			this.props.showSuccess('Updated issue successfully.');
          });
      } else {
        response.json()
          .then((error) => {
            this.props.showError(`Failed to update issue: ${error.message}`);
          });
      }
    }).catch((err) => {
      this.props.showError(`Error in sending data to server: ${err.message}`);
    });
  }/* onSubmit() */


  loadData() {
    const sWho = 'IssueEdit::loadData';

    console.log(`${sWho}()...`);

    IssueEdit.dataFetcher({params: this.props.params})
    .then(data => {
       const issue = data.IssueEdit;
       issue.created = new Date(issue.created);
       issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
       this.setState({issue}); 
    })
    .catch((err) => {
      console.log(`${sWho}(): Caught error:`, err );
      this.props.showError(`Error in fetching data from server: ${err.message}`);
    });
  }

  render() {

    const issue = this.state.issue;

    let validationMessage = null;

    if( Object.keys(this.state.invalidFields).length !== 0
           &&
        this.state.showingValidation)
    {
      validationMessage = (
        <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
        Please correct invalid fields before submitting.
        </Alert>
      );
    }

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
                <option value="Verified">Verified</option>
                <option value="Closed">Closed</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Owner</Col>
            <Col sm={9}>
              <FormControl name="owner"
               value={issue.owner} onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Effort</Col>
            <Col sm={9}>
              <FormControl componentClass={NumInput} name="effort"
               value={issue.effort} onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup validationState={this.state.invalidFields.completionDate ? 'error' : null }>
            <Col componentClass={ControlLabel} sm={3}>
            Completion Date
            </Col>
            <Col sm={9}>
              <FormControl componentClass={DateInput}
               name="completionDate"
               value={issue.completionDate} 
               onChange={this.onChange}
               onValidityChange={this.onValidityChange}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Title</Col>
            <Col sm={9}>
              <FormControl name="title" value={issue.title}
               onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={3} sm={6}>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit" disabled={!this.props.user.signedIn}>
                Submit
                </Button>
                <LinkContainer to="/issues">
                  <Button bsStyle="link">Back to Issues</Button>
                </LinkContainer>
              </ButtonToolbar>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={3} sm={9}>{validationMessage}</Col>
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
  }
}

IssueEdit.contextTypes = {
  initialState: PropTypes.object,
}

IssueEdit.propTypes = {
  params: PropTypes.object.isRequired,
  showSuccess: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

// Use the Higher Order Component design pattern
// to enhance IssueEdit with Toast functionality...
const IssueEditWithToast = withToast(IssueEdit);

// There's one change that an HOC causes: any static
// functions that you used in the original component 
// are no longer available in the wrapped component.
// We must explicitly copy the static functions from
// the original to the wrapped.
IssueEditWithToast.dataFetcher = IssueEdit.dataFetcher;

export default IssueEditWithToast;


