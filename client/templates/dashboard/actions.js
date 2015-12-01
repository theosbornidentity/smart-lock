Template.actions.onRendered(function() {
    //hide user form on initial page load
    Session.set('showUserForm', false);
});


Template.actions.helpers({
  //shows user form
  showUserForm: function () {
    return Session.get('showUserForm');
  },
  //checks if last log was locked (for status purposes)
  locked: function () {
    var lastLog = getLastLog();
    return lastLog.action.toLowerCase() === 'locked';
  }
});

Template.actions.events({
  //calls unlock method
  'click .unlock': function(e) {
    e.preventDefault();
    Meteor.call('unlock', function(error) {
      // Add error handling
    });
  },
  //calls lock method
  'click .lock': function(e) {
    e.preventDefault();
    Meteor.call('lock', function(error) {
      // Add error handling
    });
  },
  //toggles on/off the user form
  'click .addUser': function(e) {
    e.preventDefault();
    Session.set('showUserForm', !Session.get('showUserForm'));
  },
  //hides the user form
  'submit #addUserForm': function(e) {
    Session.set('showUserForm', false);
  },
  //shows the user form
  'submit #addPinForm': function(e) {
    Session.set('showUserForm', false);
  }
});

Template.addUserForm.helpers({
  //form schema for creating a new user
  addUserFormSchema: function () {
    return new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email,
          label: "Email"
        },
        firstName: {
          type: String,
          label: "First Name"
        },
        lastName: {
          type: String,
          label: "Last Name"
        }
    });
  }
});

//gets the last log from mini mongo
function getLastLog() {
  return Logs.findOne({}, {sort: {date: -1}});
}
