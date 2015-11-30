Template.unauthorized.helpers({
  validatePinFormSchema: function () {
    return new SimpleSchema({
        pin: {
          type: String,
          min: 4,
          max: 4
        }
    });
  }
});
