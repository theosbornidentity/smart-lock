Meteor.publish('logs', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Logs.find({}, options);
});

Meteor.publish('users', function() {
  return Meteor.users.find({});
});

Meteor.publish('status', function() {
  return Status.find({}, {sort: {date: -1}, limit: 1});
});
