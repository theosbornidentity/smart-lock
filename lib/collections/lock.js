Meteor.methods({
  //unlocks the lock
  unlock: function() {
    //verifies user is logged in
    var user = Meteor.user();
    //only send serial command if on backend
    if (Meteor.isServer) {
      Meteor.sendToSerialPort("-1\n");
    }
    //insert unlocked log
    Logs.insert({
      user: user.profile.firstName + " " + user.profile.lastName,
      date: new Date(),
      action: 'Unlocked'
    });
  },
  //locks the lock
  lock: function() {
    //verifies user is logged in
    var user = Meteor.user();
    //only send serial command if on backend
    if (Meteor.isServer) {
      Meteor.sendToSerialPort("1\n");
    }
    //insert locked log
    Logs.insert({
      user: user.profile.firstName + " " + user.profile.lastName,
      date: new Date(),
      action: 'Locked'
    });
  }
});
