Router.configure({
	layoutTemplate: 'main_layout'
});

Router.map(function(){
	// Messages
	this.route('msgs', {
		path: '/msgs',
		template: 'msgs'
	});

	// Login
	this.route('login', {
		path: '/',
		template: 'login'

	});



	// Signup
	this.route('signup', {
		path: '/signup',
		template: 'signup'
	});

	// Profile
	this.route('profile', {
		path: '/profile',
		template: 'profile'
	});

	// Classement
	this.route('classement', {
		path: '/classement',
		template: 'classement'
	});

	// Search
	this.route('search', {
		path: '/search',
		template: 'search'
	});
});
