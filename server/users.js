Meteor.methods({
  //admin user created account
  createUserFromAdmin: function(doc) {
    var userId = Accounts.createUser({
       email:    doc.email,
       profile: {
         firstName: doc.firstName,
         lastName: doc.lastName
       },
       roles: ['authorizedUser']
     });
     //send email to new user
    Accounts.sendEnrollmentEmail(userId);
  },
  //admin user deleted account
  deleteUserFromAdmin: function(doc) {
    if(Meteor.user()) Meteor.users.remove(doc._id);
  },
  //validate that a pin was correct
  validatePin: function(doc) {
    var thisPin = Pins.findOne({number: doc.pin}); //lookup if pin exists
    if(thisPin !== undefined) { //if pin found
      Pins.remove(thisPin); //remove pin so it can't be used again
      Roles.addUsersToRoles(Meteor.userId(), ['authorizedUser']); //authorize user
    }
  },
  //promote a user to owner
  promote: function(doc) {
    if(Meteor.user()) Roles.addUsersToRoles(doc._id, 'owner');
  },
  //demote a user from owner
  demote: function(doc) {
    if(Meteor.user()) Roles.removeUsersFromRoles(doc._id, 'owner');
  },
  //disable user
  disableUser: function(doc) {
    if(Meteor.user()) Roles.addUsersToRoles(doc._id, 'disabled');
  },
  //re-enable user
  enableUser: function(doc) {
    if(Meteor.user()) Roles.removeUsersFromRoles(doc._id, 'disabled');
  }
});
