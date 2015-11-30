Pins = new Mongo.Collection('pins');

Pins.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, 'owner');
  }
});

// Meteor.methods({
//   validatePin: function(doc) {
//     var thisPin = Pins.findOne({number: doc.pin});
//     if(thisPin !== undefined) {
//       Pins.remove(thisPin);
//       Roles.addUsersToRoles(Meteor.userId(), ['authorizedUser']);
//     }
//   }
// });

Pins.attachSchema(new SimpleSchema({
  number: {
    type: String,
    label: "Add Pin",
    max: 4,
    min: 4
  }
}));
