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
  },
  promote: function(doc) {
    if(Meteor.user()) Roles.addUsersToRoles(doc._id, 'owner');
  },
  demote: function(doc) {
    if(Meteor.user()) Roles.removeUsersFromRoles(doc._id, 'owner');
  },
  disableUser: function(doc) {
    if(Meteor.user()) Roles.addUsersToRoles(doc._id, 'disabled');
  },
  enableUser: function(doc) {
    if(Meteor.user()) Roles.removeUsersFromRoles(doc._id, 'disabled');
  }
});
