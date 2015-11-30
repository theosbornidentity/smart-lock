Template.actions.onRendered(function() {
    Session.set('showUserForm', false);
});

Template.actions.helpers({
  showUserForm: function () {
    return Session.get('showUserForm');
  },
  locked: function () {
    var lastLog = getLastLog();
    return lastLog.action.toLowerCase() === 'locked';
  }
});

Template.actions.events({
  'click .unlock': function(e) {
    e.preventDefault();
    Meteor.call('unlock', function(error) {
      // Add error handling
    });
  },
  'click .lock': function(e) {
    e.preventDefault();
    Meteor.call('lock', function(error) {
      // Add error handling
    });
  },
  'click .addUser': function(e) {
    e.preventDefault();
    Session.set('showUserForm', !Session.get('showUserForm'));
  },
  'submit #addUserForm': function(e) {
    Session.set('showUserForm', false);
  },
  'submit #addPinForm': function(e) {
    Session.set('showUserForm', false);
  }
});

Template.addUserForm.helpers({
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

function getLastLog() {
  return Logs.findOne({}, {sort: {date: -1}});
}
