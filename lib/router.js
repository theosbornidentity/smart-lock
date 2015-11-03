Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/:logsLimit?', {
  name:'home',
  waitOn: function() {
    var limit = parseInt(this.params.logsLimit) || 5;
    return [
      Meteor.subscribe('logs',  {sort: {date: -1}, limit: limit }),
      Meteor.subscribe('users'),
      Meteor.subscribe('status')
    ];
  },
  data: function() {
    return {
      logsLimit: parseInt(this.params.logsLimit) || 5,
      users: Meteor.users.find({}),
      logs: Logs.find({}, {sort: {date: -1}}),
      status: Status.find({}, {sort: {date: -1}, limit: 1})

    };
  }
});

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

Router.onBeforeAction(requireLogin, {except: []});

var getTitle = function () {
  document.title = 'Smart Lock: ' + Router.current().route.getName();
};

Router.onAfterAction(getTitle);
