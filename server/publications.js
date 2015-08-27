Meteor.publish('logs', function() {
  return Logs.find({});
});

Meteor.publish('users', function() {
  return Meteor.users.find({})
})
