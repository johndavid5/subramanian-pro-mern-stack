import React from 'react';
// import {Link} from 'react-router';

export default class IssueFilter extends React.Component {
  constructor() {
    super();
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilterOpen = this.setFilterOpen.bind(this);
    this.setFilterAssigned = this.setFilterAssigned.bind(this);
  }

  setFilterOpen(e) {
    e.preventDefault();
    this.props.setFilter({ status: 'Open' });
  }

  setFilterAssigned(e) {
    e.preventDefault();
    this.props.setFilter({ status: 'Assigned' });
  }

  clearFilter(e) {
    e.preventDefault();
    this.props.setFilter({});
  }

  render() {
    const Separator = () => <span>|</span>;
    return (
      <div>
        <a href="#" onClick={this.clearFilter}>All Issues</a>
        <Separator />
        <a href="#" onClick={this.setFilterOpen}>Open Issues</a>
        <Separator />
        <a href="#" onClick={this.setFilterAssigned}>Assigned Issues</a>
      </div>
    );

    // return (
    //  <div>
    //    <Link to="/issues">All Issues</Link>
    //    <Separator />
    //    <Link to={{pathname:'/issues', query: {status: 'Open'}}}>Open Issues</Link>
    //    <Separator />
    //    <Link to="/issues?status=Assigned">Assigned Issues</Link>
    //  </div>
    // );
  }
}

IssueFilter.propTypes = {
  setFilter: React.PropTypes.func.isRequired,
};
