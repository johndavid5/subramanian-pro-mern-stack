//'use strict'; /* strict -- important for node 4.5 for allowing use of const */ 
import logger from '../logger'; 

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


/**
* returns null for valid issue,
* otherwise returns error string.
*/
function validateIssue(issue){
	for(const field in issueFieldType){
		const type = issueFieldType[field];
		if( ! type ){
			// delete fields that do not belong
			delete issue[field];
		}
		else if(type === 'required' && ! issue[field]){
			return `${field} is required.`;
		}
	}

	if(!validIssueStatus[issue.status]){
		return `${issue.status} is not valid status`;
	}

	return null; // success
};

//module.exports = {
//	validateIssue: validateIssue
//};

export default {
	validateIssue: validateIssue
};

