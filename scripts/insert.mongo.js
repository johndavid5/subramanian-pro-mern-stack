db = new Mongo().getDB('issuetracker');

db.issues.insertMany([
  {
    status: 'Open', owner: 'Ravana',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Get rid of Rama.',
  },
  {
    status: 'Open', owner: 'Rama',
    created: new Date('2016-08-15'), effort: 6, completionDate: new Date('2016-08-30'),
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
    created: new Date('2016-08-16'), effort: 13, completionDate: new Date('2016-08-17'),
    title: 'Rescue Sita.',
  },
  {
    status: 'Assigned', owner: 'Khumbakarna',
    created: new Date('2017-09-16'), effort: 28, completionDate: undefined,
    title: 'Get rid of flying monkeys.',
  },
  {
    status: 'Assigned', owner: 'Vibhishana',
    created: new Date('2017-09-16'), effort: 27, completionDate: new Date('2017-09-16'),
    title: 'A mind as pure as lotus leaves.',
  },
  {
    status: 'Assigned', owner: 'Tumburu',
    created: new Date('2017-09-16'), effort: 15, completionDate: undefined,
    title: 'A song to sing.',
  },
  {
    status: 'Assigned', owner: 'Arnie',
    created: new Date('2017-09-16'), effort: 15, completionDate: undefined,
    title: 'Let off some steam, Bennett!',
  },
]);

