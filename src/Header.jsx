import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, NavItem, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'; 
import {withRouter} from 'react-router';
import Select from 'react-select';

import SigninNavItem from './SigninNavItem.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import withToast from './withToast.jsx';

const Header = (props) => {

  function searchIssues(input){  

    const sWho = "Header::searchIssues";		 

    if(input.length < 2){
      return Promise.resolve( { options:[] } );
    }
    
    return fetch(`/api/issues?search=${input}`)
    .then(response=>{

      if(!response.ok){
        return response.json()
        .then(error=>Promise.reject(error));
      }

      return response.json()
      .then(data=>{
        const options = data.records.map(issue => ({
          value: issue._id,
          label:`${issue._id.substr(-4)}:${issue.title}`,
        }));
        let oReturn = {options};
        console.log(`${sWho}(): Returning `, oReturn, `...`);
        return oReturn;
      })
      .catch(error=>{
        console.log(`${sWho}(): Error: ${error}`);
        this.props.showError(`Error fetching data from server: ${error}`);
      });

	});
  }/* searchIssues() */

  /* Normally, the Select component looks at the list of options
  * that we gave it, and further filters it based on what the user has typed.
  * To override this and tell it that the list has already been filtered based
  * on the input text, we had to return the fetched array, no matter what the input was.
  * This ensures that the list fetched from the server is shown in its entirety, without
  * another filter applied by the Select component.
  */
  function filterOptions(options){
    return options;
  }

  function selectIssue(item){
    if(item){
      props.router.push(`/issues/${item.value}`);
    }
  }

  return (
  <Navbar fluid>
    <Col sm={5}>
      <Navbar.Header>
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to="/issues">
          <NavItem>Issues</NavItem>
        </LinkContainer>
        <LinkContainer to="/reports">
          <NavItem>Reports</NavItem>
        </LinkContainer>
      </Nav>
    </Col>
    <Col sm={4}>
      <div style={{paddingTop: 8}}>
        <Select.Async
         instanceId="search"
         placeholder="Search..."
         autoload={false}
         cache={false}
         loadOptions={searchIssues}
         filterOptions={filterOptions}
         onChange={selectIssue}
         autosize={false}
        />
      </div>
    </Col>
    <Col sm={3}>
      <Nav pullRight>
        {props.user.signedIn ? <IssueAddNavItem showError={props.showError}/> : null}
        <SigninNavItem
         user={props.user} onSignin={props.onSignin} 
         onSignout={props.onSignout} showError={props.showError}
         showSuccess={props.showSuccess}
        />
      </Nav>
    </Col>
  </Navbar>
  );
};

Header.propTypes = {
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
  onSignin: PropTypes.func.isRequired,
  onSignout: PropTypes.func.isRequired,
  user: PropTypes.object,
  router: PropTypes.object,
}

export default withRouter(withToast(Header));


