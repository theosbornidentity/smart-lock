//sets up loading layout and layout template
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

//routes when there is a log limit number
Router.route('/:logsLimit?', {
  name:'home',
  //subscribes to necessary collections
  waitOn: function() {
    var limit = parseInt(this.params.logsLimit) || 5;
    return [
      Meteor.subscribe('logs',  {sort: {date: -1}, limit: limit }),
      Meteor.subscribe('users')
    ];
  },
  //gets data for controller
  data: function() {
    return {
      logsLimit: parseInt(this.params.logsLimit) || 5,
      users: Meteor.users.find({})
    };
  }
});

//requires login filter. checks if user is logged in
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

//run login filter on every action
Router.onBeforeAction(requireLogin, {except: []});

//filter to check if the user is disabled
var checkDisabled = function() {
  if (Roles.userIsInRole(Meteor.userId(), 'disabled')) this.render('disabled');
  else this.next();
};

//run disabled filter on every action
Router.onBeforeAction(checkDisabled, {except: []});

//filter to check if the user has authorization permsisions
var requirePermission = function() {
  if (Roles.userIsInRole(Meteor.userId(), 'authorizedUser')) this.next();
  else this.render('unauthorized');
};

//requires permissions for every action
Router.onBeforeAction(requirePermission, {except: []});

//gets page title
var getTitle = function () {
  document.title = 'Smart Lock: ' + Router.current().route.getName();
};

//runs page title adder for every page
Router.onAfterAction(getTitle);
