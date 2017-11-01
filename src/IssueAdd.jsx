import React from 'react';
/* Update for React 16.0.0: PropTypes is now required as a separate module
* ...it's no longer available via React.PropTypes.
*/
import PropTypes from 'prop-types';

export default class IssueAdd extends React.Component {
  constructor() {
    super();

    // bind once, re-use many times...
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;

    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });

    // Clear the form for the next input
    form.owner.value = '';
    form.title.value = '';
  }

  handleClear() {
    // document.forms.issueAdd.owner.value = '';
    // document.forms.issueAdd.title.value = '';
    this.owner.value = '';
    this.title.value = '';
  }

  handleReset() {
    // document.forms.issueAdd.owner.value = 'Kumbhakarna';
    // document.forms.issueAdd.title.value = 'Get rid of flying monkeys.';
    this.owner.value = 'Kumbhakarna';
    this.title.value = 'Get rid of flying monkeys.';
  }

  render() {
    /* eslint max-len: "off" */
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

IssueAdd.propTypes = {
  //  createIssue: React.PropTypes.func.isRequired,
  createIssue: PropTypes.func.isRequired,
};
