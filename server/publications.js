Meteor.publish('logs', function() {
  return Logs.find({});
});

Meteor.publish('users', function() {
  return Meteor.users.find({});
});

Meteor.publish('status', function() {
  return Status.find({}, {sort: {date: -1}, limit: 1});
});
