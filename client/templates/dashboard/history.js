Template.history.onCreated(function () {
  this.userFilter = new ReactiveVar('');
});

Template.history.onRendered(function () {
  this.find('.wrapper')._uihooks = {
    insertElement: function (node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    }
  }
});

Template.history.helpers({
  logs: function() {
    var userName = Template.instance().userFilter.get();
    if(userName === '') return Logs.find({}, {sort: {date: -1}});
    return Logs.find({user: userName}, {sort: {date: -1}});
  },
  currentUserFilter: function () {
    var userName = Template.instance().userFilter.get();
    if(userName === '') return "Users";
    else return 'User: ' + userName;
  }
});

Template.history.events({
	'click .dropdown-toggle': function(event) {
		event.stopPropagation();
    $('#user-dropdown').toggleClass('open');
	},
  'click #user-filter': function(event, template) {
    template.userFilter.set(this.profile.firstName + ' ' + this.profile.lastName);
  },
  'click #no-user-filter': function(event, template) {
    template.userFilter.set('');
  }
});

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
