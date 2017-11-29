import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Table } from 'react-bootstrap';
import IssueFilter from './IssueFilter.jsx';
import Toast from './Toast.jsx';

const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];

const StatRow = ( props ) => (
  <tr>
    <td>{props.owner}</td>
    {statuses.map((status, index)=>(
       <td key={index}>{props.counts[status]}</td>
       )
     )}
  </tr>
);

StatRow.propTypes = {
  owner: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired,
};

export default class IssueReport extends React.Component {

  static dataFetcher({urlBase, location}){

    const search = location.search ? `${location.search}&_summary`: '?_summary';

    return fetch(`${urlBase || ''}/api/issues${search}`)
    .then(response=>{
       if( !response.ok ){
         return response.json()
         .then(error =>
           Promise.reject(error)
		 );
       }

       return response.json()
       .then(
         data=>(
         {IssueReport: data}
         )
       );
    });
  }/* static dataFetcher() */

  constructor(props, context){

    super(props, context);

    const stats = context.initialState.IssueReport ? context.initialState.IssueReport : {};

    this.state = {  
      stats,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };

    this.setFilter = this.setFilter.bind(this);
    this.showError = this.showError.bind(this); 
    this.dismissToast = this.dismissToast.bind(this);

  }/* constructor() */

  componentDidMount(){
    this.loadData();    
  }/* componentDidMount() */

  componentDidUpdate(prevProps){
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if( oldQuery.status === newQuery.status 
        && oldQuery.effort_gte === newQuery.effort_gte
        && oldQuery.effort_lte === newQuery.effort_lte ){
      // Nothing has changed, don't re-load...
      return;
    }
    this.loadData();
  }/* componentDidUpdate() */

  setFilter(query){
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }

  showError(message){
    this.setState({toastVisible: true, toastMessage: message, toastType: 'danger'});
  }

  dismissToast(){
    this.setState({toastVisible: false});
  }

  loadData(){
    IssueReport.dataFetcher({location: this.props.location})  
    .then( data => {
      this.setState( { stats: data.IssueReport } );
    })
    .catch( err => {
      this.showError(`Error in fetching data from server: ${err}`);
    });
  }/* loadData() */

  render(){
    return (
      <div>
        <Panel collapsible header="Filter">
          <IssueFilter setFilter={this.setFilter} initFilter={this.props.location.query} />
        </Panel>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th></th>
              {statuses.map((status,index) =>  <td key={index}>{status}</td>)}
               
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.stats).map((owner,index)=>
             <StatRow key={index} owner={owner} counts={this.state.stats[owner]}/> 
            )}
          </tbody>
        </Table>
        <Toast
         showing={this.state.toastVisible}
         message={this.state.toastMessage}
         onDismiss={this.dismissToast}
         bsStyle={this.state.toastType}
        />
      </div>
    );
  }/* render() */

}/* export default class IssueReport extends React.Component */

IssueReport.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
};

IssueReport.contextTypes = {
  initialState: PropTypes.object,
};
