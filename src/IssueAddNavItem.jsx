/* A Model dialog for adding items... */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';

import Toast from './Toast.jsx';

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  submit(e) {
    e.preventDefault();

    this.hideModal();

    const leForm = document.forms.issueAdd;

    const newIssue = {
      owner: leForm.owner.value,
      title: leForm.title.value,
      status: 'New',
      created: new Date(),
    };

    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((updatedIssue) => {
            // Go to the new issue...
            this.props.router.push(`/issues/${updatedIssue._id}`);
          });
      } else {
        response.json()
          .then( (error) => {
            this.showError(`Failed to add issue: ${error.message}`);
		  }); 
      }
    })
    .catch(err => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }/* submit() */

  render() {
    return (
      <NavItem onClick={this.showModal}><Glyphicon glyph="plus" />
      Create Issue
        <Modal keyboard show={this.state.showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueAdd">
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl name="title" autoFocus /> 
              </FormGroup>
              <FormGroup>
                <ControlLabel>Owner</ControlLabel>
                <FormControl name="owner" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" bsStyle="primary" onClick={this.submit}>Submit</Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast showing={this.state.toastVisible} message={this.state.toastMessage} onDismiss={this.dismissToast} bsStyle={this.state.toastType} />
      </NavItem>
    );
  }/* render() */
}/* class IssueAddNavItem */

IssueAddNavItem.propTypes = {
  router: PropTypes.object,
}

// Inject the router property into the components which need it, using
// ReactRouter's withRouter method.  This method wraps a given component
// and makes the router property available.
//
// Return component wrapped via withRouter rather than bare component.
// This way the client does not need to know that we are 
// Compare to withRouter use in App.jsx:
//      <Route path="/issues" component={withRouter(IssueList)} />
//
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
// You can get access to the history object's properties and the closest <Route>'s
// match via the withRouter higher-order component. withRouter will pass updated match,
// location, and history props to the wrapped component whenever it renders.
export default withRouter(IssueAddNavItem);
