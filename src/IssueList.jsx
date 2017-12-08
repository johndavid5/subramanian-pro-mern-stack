import React from 'react';
/* Update required for React 16.0.0: PropTypes is required as
* a separate module...it will no longer available via React.PropTypes.
*/
import PropTypes from 'prop-types';

//import 'whatwg-fetch'; // polyfill for Fetch API for dinosaur browsers...
import 'isomorphic-fetch'; // polyfill for Fetch API for dinosaur browsers...

import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';

import IssueFilter from './IssueFilter.jsx';
//import Toast from './Toast.jsx';
import withToast from './withToast.jsx';
import Utils from './Utils.jsx';

const PAGE_SIZE = 10;

const IssueRow = (props) => {

  console.log('IssueRow: props = ', props);

  function onDeleteClick(){
    // Delegate to parent-supplied deleter...
    if( confirm( "Are you sure you wish to delete this issue?" ) ){
      props.deleteIssue(props.issue._id);
    }
  }

  return (
    <tr>
      <td><Link to={`issues/${props.issue._id}`}>{props.issue._id.substr(-4)}</Link></td>
      <td>{props.issue.status}</td>
      <td>{props.issue.owner}</td>
      <td>{props.issue.created.toDateString()}</td>
      <td>{props.issue.effort}</td>
      <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
      <td>{props.issue.title}</td>
      <td>
        <Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button>
      </td>      
    </tr>
  );
};

IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

// For performance reasons, stateless components
// should be written as functions rather than classes.
// The view is a pure function of its props.
function IssueTable(props) {

  var sWho = "IssueTable;"

  const issueRows = props.issues.map(
    issue =>
    (<IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />)
  );

  console.log(`${sWho}(): issueRows = `, issueRows );

  // https://reactjs.org/docs/handling-events.html
  function onSortClick(sortField, e){
    // Delegate to parent-supplied sorter...
    let sWho = "IssueTable::onSortClick";
    console.log(`${sWho}(): sortField = "`, sortField, `", e = `, e , `...`);
    console.log(`${sWho}(): e.currentTarget = `, e.currentTarget );
    props.sortBy(sortField);
  }

  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th onClick={(e) => onSortClick('id', e)}>Id <Button bsSize="xsmall" className="arrow"><Glyphicon glyph="arrow-up" /></Button></th>
          <th onClick={(e) => onSortClick('status', e)}>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </Table>
  );
}

IssueTable.propTypes = {
  issues: PropTypes.array.isRequired,
  deleteIssue: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
};

class IssueList extends React.Component {

  static dataFetcher({urlBase, location}){

    const sWho = "IssueList::dataFetcher";

    //const url = `${urlBase||''}/api/issues${location.search}`;

    //console.log(`${sWho}(): fetching ${url}...`); 

    //return fetch(url)
    //.then(response => { 

    const query = Object.assign({}, location.query);

    const pageStr = query._page;

    if( pageStr ){
      delete query._page;
      query._offset = (parseInt(pageStr, 10)-1)*PAGE_SIZE;
    }

    query._limit = PAGE_SIZE;

    const search = Object.keys(query).map(k=>`${k}=${query[k]}`).join('&');

    const url = `${urlBase||''}/api/issues?${search}`;

    console.log(`${sWho}(): fetching ${url}...`); 

    return fetch(url)
    .then( response => {

      if(!response.ok){
        return response.json()
        .then( (error) => { 
          console.log(`${sWho}(): response.ok is falsey, Moe, returnin' Promise.reject...`);
		  return Promise.reject(error) }
		);
      }

      return response.json()
      .then( ( data ) => {
        console.log(`${sWho}(): response.ok is truey, Moe, returnin {IssueList: data = `, data, `}...`);
        return {IssueList: data};
      });
    
    });
  }

  constructor(props,context) {

    super(props,context);

    const data = context.initialState.IssueList ? context.initialState.IssueList : { metadata: { totalCount: 0 }, records: [] };

    const issues = data.records;

    issues.forEach( issue => {
      issue.created = new Date(issue.created);
      if(issue.completionDate){
        issue.completionDate = new Date(issue.completionDate);
      }
    });

    this.state = {
      issues, // shorthand for issues: issues
      totalCount: data.metadata.totalCount,
	};

    // Bind once...re-use multiple times...
    // actually, you must bind it here in
    // the constructor since it's now being
    // called from another component...
    this.setFilter = this.setFilter.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.sortBy = this.sortBy.bind(this);

    this.deleteIssue = this.deleteIssue.bind(this);
  }


  // A React lifecycle method to indicate that
  // the component is ready...
  // that is, mounted and placed into the DOM...
  // ...a bit like onLoad() in a web page...
  componentDidMount() {
    const sWho = 'componentDidMount';
    console.log(`${sWho}: Calling this.loadData()...`);
    this.loadData();
  }

  // A React lifecycle method to indicate that
  // a property - any property - of the component
  // has changed.
  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status
		&& oldQuery.effort_gte === newQuery.effort_gte
		&& oldQuery.effort_lte === newQuery.effort_lte
		&& oldQuery._page === newQuery._page
    ) {
      return;
    }

    const sWho = 'IssueList::componentDidUpdate';

    console.log(`${sWho}(): oldQuery = `, oldQuery);
    console.log(`${sWho}(): newQuery = `, newQuery);
    console.log(`${sWho}(): Calling this.loadData()...`);

    this.loadData();
  }

  /* e.g., setFilter({status: 'Open'}); */
  setFilter(query) {
    // Keep the pathname the same, modify only the query string...
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }

  selectPage(eventKey){

    const sWho = "IssueList::selectPage";

    console.log(`${sWho}(): eventKey = `, eventKey );
    console.log(`${sWho}(): Current query = this.props.location.query =`, this.props.location.query, `...`);

    // Push the page number as _page parameter to the URL...
    const query = Object.assign(this.props.location.query,
			{ _page: eventKey});

    console.log(`${sWho}(): Pushing updated query = `, query, ` to router...`);

    this.props.router.push({pathname: this.props.location.pathname, query});
  }

  sortBy(sortField){

    const sWho = "IssueList::sortBy";

    console.log(`${sWho}(): sortField = `, sortField );
    console.log(`${sWho}(): Current query = this.props.location.query =`, this.props.location.query, `...`);

    //const query = Object.assign(this.props.location.query,
	//		{ _page: eventKey});

    //console.log(`${sWho}(): Pushing updated query = `, query, ` to router...`);

    //this.props.router.push({pathname: this.props.location.pathname, query});
  }

  loadData() {

    const sWho = 'loadData';

    // const url = '/api/issues';
    const url = `/api/issues${this.props.location.search}`;

    console.log(`${sWho}(): Calling fetch("${url}")...\n`);

    IssueList.dataFetcher({location: this.props.location})
    .then(data => {

      const issues = data.IssueList.records;

      issues.forEach(issue => {
        // Convert from ISO date string to Date object...
        issue.created = new Date(issue.created);

        if (issue.completionDate) {
          issue.completionDate = new Date(issue.completionDate);
        }
      });

      this.setState({issues, totalCount: data.IssueList.metadata.totalCount});
    })
    .catch((err) => {
      console.log(`${sWho}(): Caught error:`, err );
      this.props.showError('HTTP Error in fetching data from server:', err);
    });
  }/* loadData() */


  deleteIssue(id){
    const sWho = 'deleteIssue';

    fetch(`/api/issues/${id}`, { method: 'DELETE'}
    ).then(response => {
      if(!response.ok){  
        console.log(`${sWho}(): response.ok != true...`);
        this.props.showError('Failed to delete issue.');
      }
      else{
        this.loadData();
      }
    })
    .catch((err) => {
      console.log(`${sWho}(): Caught error:`, err );
      this.props.showError('HTTP Error in deleting issue from server:', err);
    });
  }

  

  render() {
    return (
      <div>
        <Panel collapsible header="Filter">
          <IssueFilter setFilter={this.setFilter} initFilter={this.props.location.query} />
        </Panel>
        <Pagination items={Math.ceil(this.state.totalCount/PAGE_SIZE)}       
         activePage={parseInt(this.props.location.query._page||'1', 10)}
         onSelect={this.selectPage}
         maxButtons={7}
	     next prev boundaryLinks 
        />
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} sortBy={this.sortBy} />
        {(function (props) { // Equivalent of Angular ng-if using IIFE()
          if (Utils.stringToBool(props.location.query.debug)) {
            return (<pre>this.props={JSON.stringify(props, null, 2)}</pre>);
          }
          return '';
        }(this.props))}
      </div>
    );
  }
}

IssueList.contextTypes = { 
  initialState: PropTypes.object,
}

IssueList.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
  showError: PropTypes.func.isRequired,
};

const IssueListWithToast = withToast(IssueList);

// After enhancing IssueList using withToast(), gotta
// re-assign the static methods...this is progress?
IssueListWithToast.dataFetcher = IssueList.dataFetcher;

export default IssueListWithToast;



