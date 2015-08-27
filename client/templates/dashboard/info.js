Template.userInfo.helpers({
  getInfo: function () {
    return this.profile.firstName + " " + this.profile.lastName + " (" + this.emails[0].address + ")";
  }
});

Template.userInfo.events({
  'click .deleteUser': function(e) {
    e.preventDefault();
    Meteor.call('deleteUserFromAdmin', this, function (error) {
      if(error) console.log("Cannot remove user.");
    });
  }
})
