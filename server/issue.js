// 'use strict'; /* strict -- important for node 4.5 for allowing use of const */
// import logger from '../logger';

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};

function cleanupIssue(issue) {

  const cleanedUpIssue = {};

  Object.keys(issue).forEach((field) => {
    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
  });

  return cleanedUpIssue;
}

function convertIssue(issue){
  if(issue.created){
	// Convert date string to Date object...
    issue.created = new Date(issue.created);
  }

  if(issue.completionDate){
	// Convert date string to Date object...
    issue.completionDate = new Date(issue.completionDate);
  }

  return cleanupIssue(issue);
}


/**
* returns null for valid issue,
* otherwise returns error string.
*/
function validateIssue(issue) {
  const errors = [];

  Object.keys(issueFieldType).forEach((field) => {
    if (issueFieldType[field] === 'required' && !issue[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });

  if (!validIssueStatus[issue.status]) {
    errors.push(`${issue.status} is not a valid status.`);
  }

  return (errors.length ? errors.join('; ') : null);
}

// module.exports = {
//  validateIssue: validateIssue
//  cleanupIssue: cleanupIssue
// };

export default {
  validateIssue,
  cleanupIssue,
  convertIssue,
};

