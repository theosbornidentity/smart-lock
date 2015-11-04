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
  };
});

Template.history.helpers({
  logs: function() {
    var user = Template.instance().userFilter.get();
    return getAndFilterLogs(user);
  },
  hasLogs: function() {
    var user = Template.instance().userFilter.get();
    return getAndFilterLogs(user).count() !== 0;
  },
  currentUserFilter: function () {
    var userName = Template.instance().userFilter.get();
    if(userName === '') return "Users";
    else return 'User: ' + userName;
  },
  nextPath: function() {
    return this.logsLimit + 5;
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
    }
  },
  getTime: function() {
    return moment(this.date).calendar();
  }
});

function getAndFilterLogs(user) {
  if(user !== "") return Logs.find({user: user}, {sort: {date: -1}});
  return Logs.find({}, {sort: {date: -1}});
}
