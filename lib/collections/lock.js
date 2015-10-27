Meteor.methods({
  unlock: function() {
    var user = Meteor.user();
    if (Meteor.isServer) {
      Meteor.sendToSerialPort('-1\n');
    }
    Logs.insert({
      user: user.profile.firstName + " " + user.profile.lastName,
      date: new Date(),
      action: 'Unlocked'
    });
    Status.insert({
      date: new Date(),
      status: 'Unlocked'
    });
  },
  lock: function() {
    var user = Meteor.user();
    if (Meteor.isServer) {
      Meteor.sendToSerialPort('1\n');
    }
    Logs.insert({
      user: user.profile.firstName + " " + user.profile.lastName,
      date: new Date(),
      action: 'Locked'
    });
    Status.insert({
      date: new Date(),
      status: 'Locked'
    });
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
