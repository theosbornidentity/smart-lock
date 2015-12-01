//publish logs collection from backend for frontend to subscribe
Meteor.publish('logs', function(options) {
  //require sort to be an object and limit to be a number to continue
  check(options, {
    sort: Object,
    limit: Number
  });
  return Logs.find({}, options); //run lookup with options from frontend
});

//publish list of users from backend for frontend to subscribe
Meteor.publish('users', function() {
  return Meteor.users.find({});
});
