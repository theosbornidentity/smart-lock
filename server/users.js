Meteor.methods({
  createUserFromAdmin: function(doc) {
    var userId = Accounts.createUser({
       email:    doc.email,
       profile: {
         firstName: doc.firstName,
         lastName: doc.lastName
       },
       roles: ['authorizedUser']
     });
    Accounts.sendEnrollmentEmail(userId);
  },
  deleteUserFromAdmin: function(doc) {
    if(Meteor.user()) Meteor.users.remove(doc._id);
  },
  validatePin: function(doc) {
    var thisPin = Pins.findOne({number: doc.pin});
    if(thisPin !== undefined) {
      Pins.remove(thisPin);
      Roles.addUsersToRoles(Meteor.userId(), ['authorizedUser']);
    }
  }
});
