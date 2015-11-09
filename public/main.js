window.app = angular.module('portfolio', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

	// this makes the '/stores/' route correctly redirect to '/stores'
	$urlRouterProvider.rule(function ($injector, $location) {

		var re = /(.+)(\/+)(\?.*)?$/;
		var path = $location.url();

		if(re.test(path)) {
			return path.replace(re, '$1$3');
		}

		return false;
	});
	// This turns off hashbang urls (/#about) and changes it to something normal (/about)
	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('/auth/:provider', function () {
		window.location.reload();
	});
	// If we go to a URL that ui-router doesn't have registered, go to the "/" url.
	$urlRouterProvider.otherwise('/');
});

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdwb3J0Zm9saW8nLCBbJ3VpLnJvdXRlciddKTtcblxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJHVybE1hdGNoZXJGYWN0b3J5UHJvdmlkZXIpIHtcblxuXHQvLyB0aGlzIG1ha2VzIHRoZSAnL3N0b3Jlcy8nIHJvdXRlIGNvcnJlY3RseSByZWRpcmVjdCB0byAnL3N0b3Jlcydcblx0JHVybFJvdXRlclByb3ZpZGVyLnJ1bGUoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG5cblx0XHR2YXIgcmUgPSAvKC4rKShcXC8rKShcXD8uKik/JC87XG5cdFx0dmFyIHBhdGggPSAkbG9jYXRpb24udXJsKCk7XG5cblx0XHRpZihyZS50ZXN0KHBhdGgpKSB7XG5cdFx0XHRyZXR1cm4gcGF0aC5yZXBsYWNlKHJlLCAnJDEkMycpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSk7XG5cdC8vIFRoaXMgdHVybnMgb2ZmIGhhc2hiYW5nIHVybHMgKC8jYWJvdXQpIGFuZCBjaGFuZ2VzIGl0IHRvIHNvbWV0aGluZyBub3JtYWwgKC9hYm91dClcblx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuXHQkdXJsUm91dGVyUHJvdmlkZXIud2hlbignL2F1dGgvOnByb3ZpZGVyJywgZnVuY3Rpb24gKCkge1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG5cdC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlclxuXHQuc3RhdGUoJ2hvbWUnLCB7XG5cdFx0dXJsOiAnLycsXG5cdFx0dGVtcGxhdGVVcmw6ICcvanMvdGVtcGxhdGVzL2hvbWUuaHRtbCdcblx0fSlcblx0LnN0YXRlKCdwcm9qZWN0cycsIHtcblx0XHR1cmw6ICcvcHJvamVjdHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnL2pzL3RlbXBsYXRlcy9wcm9qZWN0cy5odG1sJ1xuXHR9KVxuXHQuc3RhdGUoJ2Fib3V0Jywge1xuXHRcdHVybDogJy9hYm91dCcsXG5cdFx0dGVtcGxhdGVVcmw6ICcvanMvdGVtcGxhdGVzL2Fib3V0Lmh0bWwnXG5cdH0pXG5cdC5zdGF0ZSgnY29udGFjdCcsIHtcblx0XHR1cmw6ICcvY29udGFjdCcsXG5cdFx0dGVtcGxhdGVVcmw6ICcvanMvdGVtcGxhdGVzL2NvbnRhY3QuaHRtbCdcblx0fSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
