Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('logs'),
      Meteor.subscribe('users'),
      Meteor.subscribe('status')
    ];
  },
  data: function() {
    return {
      users: Meteor.users.find({}),
      logs: Logs.find({}, {sort: {date: -1}}),
      status: Status.find({}, {sort: {date: -1}, limit: 1})

    };
  }
});

Router.route('/', { name:'home' });

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
