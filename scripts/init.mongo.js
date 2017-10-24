db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.insertMany([
  {
    status: 'Open', owner: 'Ravana',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Get rid of Rama.',
  },
  {
    status: 'Open', owner: 'Rama',
    created: new Date('2016-08-15'), effort: 5, completionDate: new Date('2016-08-30'),
    title: 'Get rid of Ravana.',
  },
  {
    status: 'Assigned', owner: 'Surpanakha',
    created: new Date('2016-08-16'), effort: 14, completionDate: undefined,
    title: 'Get rid of Sita.',
  },
  {
    status: 'Assigned', owner: 'Surpanakha',
    created: new Date('2016-08-16'), effort: 17, completionDate: undefined,
    title: 'Get Ram.',
  },
  {
    status: 'Assigned', owner: 'Sita',
    created: new Date('2016-08-16'), effort: 14, completionDate: undefined,
    title: 'Get rid of Surpanakha.',
  },
  {
    status: 'Assigned', owner: 'Hanuman',
    created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-17'),
    title: 'Rescue Sita.',
  },
]);

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
