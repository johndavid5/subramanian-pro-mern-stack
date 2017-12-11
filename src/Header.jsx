import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'; 
import {withRouter} from 'react-router';
import Select from 'react-select';

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
        <IssueAddNavItem showError={props.showError}/>
        <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
          <MenuItem>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    </Col>
  </Navbar>
  );
};

Header.propTypes = {
  showError: PropTypes.func.isRequired,
  router: PropTypes.object,
}

export default withRouter(withToast(Header));


