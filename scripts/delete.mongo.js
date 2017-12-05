db = new Mongo().getDB('issuetracker');

db.issues.remove({});
