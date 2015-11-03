Template.userInfo.helpers({
  getInfo: function () {
    return this.profile.firstName + " " + this.profile.lastName + " (" + this.emails[0].address + ")";
  },
});
Template.lockStatus.helpers({
  getStatus: function() {
    return this.status;
  },
  getStyle: function() {
    if (this.status === 'Unlocked') {
      return 'color: #66bb6a';

    } else {
      return 'color: #e57373';
    }
  },
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
