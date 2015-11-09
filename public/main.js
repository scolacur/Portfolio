window.app = angular.module('portfolio', ['ui.router']);
console.log('YOOO');

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ3BvcnRmb2xpbycsIFsndWkucm91dGVyJ10pO1xuY29uc29sZS5sb2coJ1lPT08nKTtcblxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJHVybE1hdGNoZXJGYWN0b3J5UHJvdmlkZXIpIHtcblxuXHQvLyB0aGlzIG1ha2VzIHRoZSAnL3N0b3Jlcy8nIHJvdXRlIGNvcnJlY3RseSByZWRpcmVjdCB0byAnL3N0b3Jlcydcblx0JHVybFJvdXRlclByb3ZpZGVyLnJ1bGUoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG5cblx0XHR2YXIgcmUgPSAvKC4rKShcXC8rKShcXD8uKik/JC87XG5cdFx0dmFyIHBhdGggPSAkbG9jYXRpb24udXJsKCk7XG5cblx0XHRpZihyZS50ZXN0KHBhdGgpKSB7XG5cdFx0XHRyZXR1cm4gcGF0aC5yZXBsYWNlKHJlLCAnJDEkMycpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSk7XG5cdC8vIFRoaXMgdHVybnMgb2ZmIGhhc2hiYW5nIHVybHMgKC8jYWJvdXQpIGFuZCBjaGFuZ2VzIGl0IHRvIHNvbWV0aGluZyBub3JtYWwgKC9hYm91dClcblx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuXHQkdXJsUm91dGVyUHJvdmlkZXIud2hlbignL2F1dGgvOnByb3ZpZGVyJywgZnVuY3Rpb24gKCkge1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG5cdC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
