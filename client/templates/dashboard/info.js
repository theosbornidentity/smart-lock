Template.info.helpers({
  getStatus: function() {
    var lastLog = getLastLog();
    return lastLog.action.toLowerCase();
  },
  getStyle: function() {
    switch(getLastLog().action) {
      case 'Unlocked':
          return 'color: #66bb6a';
      case 'Locked':
          return 'color: #e57373';
      default:
          return '';
    }
  }
});

Template.userInfo.helpers({
  getName: function () {
    return this.profile.firstName + " " + this.profile.lastName;
  },
  getEmail: function () {
    return " (" + this.emails[0].address + ")";
  }
});

Template.userInfo.events({
  'click .deleteUser': function(e) {
    e.preventDefault();
    Meteor.call('deleteUserFromAdmin', this, function (error) {
      if(error) console.log("Cannot remove user.");
    });
  }
});

function getLastLog() {
  return Logs.findOne({}, {sort: {date: -1}});
}
