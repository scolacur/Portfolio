app.config(function($stateProvider){
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/js/templates/home.html'
	})
	.state('projects', {
		url: '/projects',
		templateUrl: '/js/templates/projects.html'
	})
	.state('about', {
		url: '/about',
		templateUrl: '/js/templates/about.html'
	})
	.state('contact', {
		url: '/contact',
		templateUrl: '/js/templates/contact.html'
	});
});
