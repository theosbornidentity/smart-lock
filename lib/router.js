Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('logs'),
      Meteor.subscribe('users')
    ];
  },
  data: function() {
    return {
      users: Meteor.users.find({})
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
