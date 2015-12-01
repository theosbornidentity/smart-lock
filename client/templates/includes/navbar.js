Template.navbar.events({
	//opens the dropdown menu toggle
	'click .dropdown-toggle': function(event) {
		event.stopPropagation();
    $("#login-dropdown-list").toggleClass("open");
	}
});
