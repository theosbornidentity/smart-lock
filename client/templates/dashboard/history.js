Template.history.onCreated(function () {
  //creates an empty user filter for logs
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
  //gets logs
  logs: function() {
    var user = Template.instance().userFilter.get();
    return getAndFilterLogs(user);
  },
  //checks if logs exist
  hasLogs: function() {
    var user = Template.instance().userFilter.get();
    return getAndFilterLogs(user).count() !== 0;
  },
  //sets current user filter text
  currentUserFilter: function () {
    var userName = Template.instance().userFilter.get();
    if(userName === '') return "Users";
    else return 'User: ' + userName;
  },
  //increments log count by 5
  nextPath: function() {
    return this.logsLimit + 5;
  }
});

Template.history.events({
  //opens/closes user dropdown
	'click .dropdown-toggle': function(event) {
		event.stopPropagation();
    $('#user-dropdown').toggleClass('open');
	},
  //sets the user filter
  'click #user-filter': function(event, template) {
    template.userFilter.set(this.profile.firstName + ' ' + this.profile.lastName);
  },
  //clears user filter
  'click #no-user-filter': function(event, template) {
    template.userFilter.set('');
  }
});
//gets style for each log
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
  //gets the time for a log
  getTime: function() {
    return moment(this.date).calendar();
  }
});

//filters logs from mini mongo
function getAndFilterLogs(user) {
  if(user !== "") return Logs.find({user: user}, {sort: {date: -1}});
  return Logs.find({}, {sort: {date: -1}});
}
