/*
Note: tried to make an array in history.js to keep track of all filtered logs depending on the query.
*/

var filteredlogs = [];

/*
Note: tried to make populate the filtered logs depending on the query in the dropdown menu. Would match the
name in the dropdown menu (first + last name) with name from the log <-
I assumed the name would be firstName + " " lastName in the log. Essentially matching name Strings between all the logs
and the dropdown menu.
*/

function populateFilteredLogs() {
  var e = document.getElementById("userdropdown");
  var nameOfDropDown = e.options[e.selectedIndex].text;


  for(i = 0 ; i < logs.length ; i++) {
    console.log(nameOfDropDown + " compared to " + logs[i].user);
    var nameOfLog = logs[i].user;
    if(nameOfLog == nameOfDropDown) {
      filteredlogs.push(logs[i]);
    }
  }

}

/*
Note: Referenced the Template.log.helpers for this one. I used this primarily to populate the dropdown menu with first/last names needed.
*/

Template.uInfo.helpers({
  getInfo: function () {
    return this.profile.firstName + " " + this.profile.lastName;
  }
});


/*
could not seem to use Template.log.helpers to populate the table in the "User History" tab so I made a new tab.
*/
Template.filteredlog.helpers({
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
