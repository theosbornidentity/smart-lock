Template.info.helpers({
  //gets the current lock status
  getStatus: function() {
    var lastLog = getLastLog();
    return lastLog.action.toLowerCase();
  },
  //styles the current lock status
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
  //adds tooltips
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
};

Template.userInfo.helpers({
  //gets name for user
  getName: function () {
    return this.profile.firstName + " " + this.profile.lastName;
  },
  //gets email for user
  getEmail: function () {
    return " (" + this.emails[0].address + ")";
  },
  //filter for if user has owner permisssions
  isOwner: function () {
    var permissions = this.roles;
    console.log(permissions);
    for(var i = 0; i < permissions.length; i++) {
      if (permissions[i] === "owner") return true;
    }
    return false;
  },
  //checks if the user is disabled
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
  //deletes user if admin
  'click .deleteUser': function(e) {
    e.preventDefault();
    Meteor.call('deleteUserFromAdmin', this, function (error) {
      if(error) console.log("Cannot remove user.");
    });
  },
  //promotes user if admin
  'click .promote': function (e) {
    Meteor.call('promote', this, function (error) {
      if(error) console.log("Cannot promote user.");
    });
  },
  //demotes user if admin
  'click .demote': function (e) {
    Meteor.call('demote', this, function (error) {
      if(error) console.log("Cannot demote user.");
    });
  },
  //disables user if admin
  'click .disable': function (e) {
    Meteor.call('disableUser', this, function (error) {
      if(error) console.log("Cannot disable user.");
    });
  },
  //enables user if admin
  'click .enable': function (e) {
    Meteor.call('enableUser', this, function (error) {
      if(error) console.log("Cannot enable user.");
    });
  }
});

//gets the last log from mini mongo
function getLastLog() {
  return Logs.findOne({}, {sort: {date: -1}});
}
