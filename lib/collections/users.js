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
              errorFunction("Please write your first name");
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
              errorFunction("Please write your first name");
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
                  errorFunction('You must accept the terms and conditions.');
                  return false;
              }
          }
      }]
  });
}
