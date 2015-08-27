Meteor.methods({
  createUserFromAdmin: function(doc) {
    console.log("create user");
    var userId = Accounts.createUser({
       email:    doc.email,
       profile: {
         firstName: doc.firstName,
         lastName: doc.lastName
       }
     });
    Accounts.sendEnrollmentEmail(userId);
  },
  deleteUserFromAdmin: function(doc) {
    if(Meteor.user()) Meteor.users.remove(doc._id);
  }
});
