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

Template.userInfo.rendered = function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
};

Template.userInfo.helpers({
  getName: function () {
    return this.profile.firstName + " " + this.profile.lastName;
  },
  getEmail: function () {
    return " (" + this.emails[0].address + ")";
  },
  isOwner: function () {
    var permissions = this.roles;
    console.log(permissions);
    for(var i = 0; i < permissions.length; i++) {
      if (permissions[i] === "owner") return true;
    }
    return false;
  },
  isDisabled: function () {
    var permissions = this.roles;
    console.log(permissions);
    for(var i = 0; i < permissions.length; i++) {
      if (permissions[i] === "disabled") return true;
    }
    return false;
  },
});

Template.userInfo.events({
  'click .deleteUser': function(e) {
    e.preventDefault();
    Meteor.call('deleteUserFromAdmin', this, function (error) {
      if(error) console.log("Cannot remove user.");
    });
  },
  'click .promote': function (e) {
    Meteor.call('promote', this, function (error) {
      if(error) console.log("Cannot promote user.");
    });
  },
  'click .demote': function (e) {
    Meteor.call('demote', this, function (error) {
      if(error) console.log("Cannot demote user.");
    });
  },
  'click .disable': function (e) {
    Meteor.call('disableUser', this, function (error) {
      if(error) console.log("Cannot disable user.");
    });
  },
  'click .enable': function (e) {
    Meteor.call('enableUser', this, function (error) {
      if(error) console.log("Cannot enable user.");
    });
  }
});

function getLastLog() {
  return Logs.findOne({}, {sort: {date: -1}});
}
