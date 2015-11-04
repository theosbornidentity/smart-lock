Meteor.publish('logs', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Logs.find({}, options);
});

Meteor.publish('users', function() {
  return Meteor.users.find({});
})
