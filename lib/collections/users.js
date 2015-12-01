if(Meteor.isClient) {
  Accounts.ui.config({
      requestPermissions: {},
      extraSignupFields: [{
          fieldName: 'firstName',
          fieldLabel: 'First Name',
          inputType: 'text',
          visible: true,
          validate: function(value, errorFunction) {
            if (!value) {
              errorFunction("Please enter your first name.");
              return false;
            } else {
              return true;
            }
          }
      }, {
          fieldName: 'lastName',
          fieldLabel: 'Last Name',
          inputType: 'text',
          visible: true,
          validate: function(value, errorFunction) {
            if (!value) {
              errorFunction("Please enter your last name.");
              return false;
            } else {
              return true;
            }
          }
      }, {
          fieldName: 'terms',
          fieldLabel: 'I accept the terms and conditions',
          inputType: 'checkbox',
          visible: true,
          saveToProfile: false,
          validate: function(value, errorFunction) {
              if (value) {
                  return true;
              } else {
                  errorFunction('You must accept the terms and conditions before continuing.');
                  return false;
              }
          }
      }]
  });
}

//only run on backend
if(Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    console.log(options);
    if(Meteor.users.find().count() === 0) { //make first user the owner
      user.roles = ['owner', 'authorizedUser'];
    }
    user.profile = {
      firstName: options.profile.firstName,
      lastName: options.profile.lastName
    };
   return user;
  });
}
