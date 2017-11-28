/* eslint-disable */

/* Generate a whole buncha data so we can test
* out our report functionality...
*/

var db = new Mongo().getDB('issuetracker');

var owners = ['Ravan', 'Eddie', 'Pieta', 'Parvati', 'Victor', 'Violet'];

var statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];

var i;
for( i = 0; i < 1000; i++ ){
  var randomCreatedDate = new Date( (new Date())-Math.floor(Math.random() * 60) * 1000*60*60*24);

  var randomCompletionDate = new Date( (new Date())-Math.floor(Math.random() * 60) * 1000*60*60*24);

  var randomOwner = owners[Math.floor(Math.random()*owners.length)];

  var randomStatus = statuses[Math.floor(Math.random()*statuses.length)];


  var randomEffort = Math.ceil(Math.random()*20);

  var issue = {
     created: randomCreatedDate,
     completionDate: randomCompletionDate,
     owner: randomOwner,
     status: randomStatus,
     effort: randomEffort,
  };

  issue.title = 'Lorem ipsum dolor sit amet, ' + i;

  print("i=", i, "inserting issue=", issue);
  printjson(issue);

  db.issues.insert(issue);
 
}
