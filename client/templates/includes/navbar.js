Template.navbar.events({
	'click .dropdown-toggle': function(event) {
		event.stopPropagation();
    $("#login-dropdown-list").toggleClass("open");
	}
});
