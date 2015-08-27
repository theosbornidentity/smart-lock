Meteor.methods({
  unlock: function() {
    var user = Meteor.user();
    Logs.insert({
      user: user.profile.firstName + " " + user.profile.lastName,
      date: new Date(),
      action: 'Unlocked'
    });
  },
  lock: function() {
    var user = Meteor.user();
    Logs.insert({
      user: user.profile.firstName + " " + user.profile.lastName,
      date: new Date(),
      action: 'Locked'
    })
  },
  disableLock: function() {
    var user = Meteor.user();
    Logs.insert({
      user: user.profile.firstName + " " + user.profile.lastName,
      date: new Date(),
      action: 'Disabled'
    });
  }
});
