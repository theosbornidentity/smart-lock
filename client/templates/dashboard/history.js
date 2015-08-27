Template.log.helpers({
  getStyle: function() {
    switch(this.action) {
      case 'Unlocked':
          return 'success';
      case 'Locked':
          return 'danger';
      default:
          return 'default';
    };
  },
  getTime: function() {
    return moment(this.date).calendar();
  }
});
