'use strict';

window.app = angular.module('portfolio', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

	// this makes the '/stores/' route correctly redirect to '/stores'
	$urlRouterProvider.rule(function ($injector, $location) {

		var re = /(.+)(\/+)(\?.*)?$/;
		var path = $location.url();

		if (re.test(path)) {
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

app.controller('aboutCtrl', function ($scope) {
	var increment = 0;
	var carousel = $('#carousel');
	var current = '#fig-1';
	var prev;
	setInterval(function () {
		increment++;
		carousel.css({
			'-webkit-transform': 'rotateX(' + increment * -60 + 'deg)'
		});
		carousel.attr('data-state', increment % 6 + 1);

		prev = current;
		current = '#fig-' + +(increment % 6 + 1);
		console.log(current);
		$(current).css({ 'border-radius': '30px' });
		$(prev).css({ 'border-radius': '0px' });
	}, 1500);
});

app.controller('contactCtrl', function ($scope, $http) {
	$scope.formData = {};

	$scope.sendMail = function () {
		$scope.waiting = true;
		$scope.sent = false;
		$scope.success = false;
		$http.post('/api/contact', $scope.formData).then(function (successResponse) {
			console.log(successResponse);
			$scope.waiting = false;
			$scope.sent = true;
			$scope.success = successResponse.data;
			$scope.formData = {};
		});
	};
});

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/js/templates/home.html'
	}).state('projects', {
		url: '/projects',
		templateUrl: '/js/templates/projects.html',
		controller: 'projectCtrl'
	}).state('about', {
		url: '/about',
		templateUrl: '/js/templates/about.html',
		controller: 'aboutCtrl'
	}).state('contact', {
		url: '/contact',
		templateUrl: '/js/templates/contact.html',
		controller: 'contactCtrl'
	});
});

app.controller('projectCtrl', function ($scope) {
	$(document).ready(function () {

		var curPage = 1;
		var numOfPages = $(".skw-page").length;
		var animTime = 1000;
		var scrolling = false;
		var pgPrefix = ".skw-page-";

		function pagination() {
			scrolling = true;

			$(pgPrefix + curPage).removeClass("inactive").addClass("active");
			$(pgPrefix + (curPage - 1)).addClass("inactive");
			$(pgPrefix + (curPage + 1)).removeClass("active");

			setTimeout(function () {
				scrolling = false;
			}, animTime);
		}

		function navigateUp() {
			if (curPage === 1) return;
			curPage--;
			pagination();
		}

		function navigateDown() {
			if (curPage === numOfPages) return;
			curPage++;
			pagination();
		}

		$(document).on("mousewheel DOMMouseScroll", function (e) {
			if (scrolling) return;
			if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
				navigateUp();
			} else {
				navigateDown();
			}
		});

		$(document).on("keydown", function (e) {
			if (scrolling) return;
			if (e.which === 38) {
				navigateUp();
			} else if (e.which === 40) {
				navigateDown();
			}
		});
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0LmpzIiwiY29udGFjdC5qcyIsImhvbWUuanMiLCJwcm9qZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBQSxDQUFBLEdBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLFdBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUE7O0FBRUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLGtCQUFBLEVBQUEsaUJBQUEsRUFBQSwwQkFBQSxFQUFBOzs7QUFHQSxtQkFBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLFNBQUEsRUFBQSxTQUFBLEVBQUE7O0FBRUEsTUFBQSxFQUFBLEdBQUEsbUJBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBQSxHQUFBLFNBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQTs7QUFFQSxNQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEVBQUE7QUFDQSxVQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsRUFBQSxFQUFBLE1BQUEsQ0FBQSxDQUFBO0dBQ0E7O0FBRUEsU0FBQSxLQUFBLENBQUE7RUFDQSxDQUFBOztBQUFBLEFBRUEsa0JBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDQSxtQkFBQSxDQUFBLElBQUEsQ0FBQSxpQkFBQSxFQUFBLFlBQUE7QUFDQSxRQUFBLENBQUEsUUFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBO0VBQ0EsQ0FBQTs7QUFBQSxBQUVBLG1CQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0NBQ0EsQ0FBQSxDQUFBOztBQ3ZCQSxHQUFBLENBQUEsVUFBQSxDQUFBLFdBQUEsRUFBQSxVQUFBLE1BQUEsRUFBQTtBQUNBLEtBQUEsU0FBQSxHQUFBLENBQUEsQ0FBQTtBQUNBLEtBQUEsUUFBQSxHQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTtBQUNBLEtBQUEsT0FBQSxHQUFBLFFBQUEsQ0FBQTtBQUNBLEtBQUEsSUFBQSxDQUFBO0FBQ0EsWUFBQSxDQUFBLFlBQUE7QUFDQSxXQUFBLEVBQUEsQ0FBQTtBQUNBLFVBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQSxzQkFBQSxFQUFBLFVBQUEsR0FBQSxTQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsTUFBQTtHQUNBLENBQUEsQ0FBQTtBQUNBLFVBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7O0FBRUEsTUFBQSxHQUFBLE9BQUEsQ0FBQTtBQUNBLFNBQUEsR0FBQSxPQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsU0FBQSxDQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQTtBQUNBLEdBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxlQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsQ0FBQTtBQUNBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxlQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsQ0FBQTtFQUVBLEVBQUEsSUFBQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDbkJBLEdBQUEsQ0FBQSxVQUFBLENBQUEsYUFBQSxFQUFBLFVBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLE9BQUEsQ0FBQSxRQUFBLEdBQUEsRUFBQSxDQUFBOztBQUVBLE9BQUEsQ0FBQSxRQUFBLEdBQUEsWUFBQTtBQUNBLFFBQUEsQ0FBQSxPQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLElBQUEsR0FBQSxLQUFBLENBQUE7QUFDQSxRQUFBLENBQUEsT0FBQSxHQUFBLEtBQUEsQ0FBQTtBQUNBLE9BQUEsQ0FBQSxJQUFBLENBQUEsY0FBQSxFQUFBLE1BQUEsQ0FBQSxRQUFBLENBQUEsQ0FDQSxJQUFBLENBQUEsVUFBQSxlQUFBLEVBQUE7QUFDQSxVQUFBLENBQUEsR0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBO0FBQ0EsU0FBQSxDQUFBLE9BQUEsR0FBQSxLQUFBLENBQUE7QUFDQSxTQUFBLENBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQTtBQUNBLFNBQUEsQ0FBQSxPQUFBLEdBQUEsZUFBQSxDQUFBLElBQUEsQ0FBQTtBQUNBLFNBQUEsQ0FBQSxRQUFBLEdBQUEsRUFBQSxDQUFBO0dBQ0EsQ0FBQSxDQUFBO0VBQ0EsQ0FBQTtDQUNBLENBQUEsQ0FBQTs7QUNoQkEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGVBQUEsQ0FDQSxLQUFBLENBQUEsTUFBQSxFQUFBO0FBQ0EsS0FBQSxFQUFBLEdBQUE7QUFDQSxhQUFBLEVBQUEseUJBQUE7RUFDQSxDQUFBLENBQ0EsS0FBQSxDQUFBLFVBQUEsRUFBQTtBQUNBLEtBQUEsRUFBQSxXQUFBO0FBQ0EsYUFBQSxFQUFBLDZCQUFBO0FBQ0EsWUFBQSxFQUFBLGFBQUE7RUFDQSxDQUFBLENBQ0EsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBLEtBQUEsRUFBQSxRQUFBO0FBQ0EsYUFBQSxFQUFBLDBCQUFBO0FBQ0EsWUFBQSxFQUFBLFdBQUE7RUFDQSxDQUFBLENBQ0EsS0FBQSxDQUFBLFNBQUEsRUFBQTtBQUNBLEtBQUEsRUFBQSxVQUFBO0FBQ0EsYUFBQSxFQUFBLDRCQUFBO0FBQ0EsWUFBQSxFQUFBLGFBQUE7RUFDQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUE7O0FDckJBLEdBQUEsQ0FBQSxVQUFBLENBQUEsYUFBQSxFQUFBLFVBQUEsTUFBQSxFQUFBO0FBQ0EsRUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxZQUFBOztBQUVBLE1BQUEsT0FBQSxHQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxNQUFBLENBQUE7QUFDQSxNQUFBLFFBQUEsR0FBQSxJQUFBLENBQUE7QUFDQSxNQUFBLFNBQUEsR0FBQSxLQUFBLENBQUE7QUFDQSxNQUFBLFFBQUEsR0FBQSxZQUFBLENBQUE7O0FBRUEsV0FBQSxVQUFBLEdBQUE7QUFDQSxZQUFBLEdBQUEsSUFBQSxDQUFBOztBQUVBLElBQUEsQ0FBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLENBQUEsV0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQTtBQUNBLElBQUEsQ0FBQSxRQUFBLElBQUEsT0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsUUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBO0FBQ0EsSUFBQSxDQUFBLFFBQUEsSUFBQSxPQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsUUFBQSxDQUFBLENBQUE7O0FBRUEsYUFBQSxDQUFBLFlBQUE7QUFDQSxhQUFBLEdBQUEsS0FBQSxDQUFBO0lBQ0EsRUFBQSxRQUFBLENBQUEsQ0FBQTtHQUNBOztBQUVBLFdBQUEsVUFBQSxHQUFBO0FBQ0EsT0FBQSxPQUFBLEtBQUEsQ0FBQSxFQUFBLE9BQUE7QUFDQSxVQUFBLEVBQUEsQ0FBQTtBQUNBLGFBQUEsRUFBQSxDQUFBO0dBQ0E7O0FBRUEsV0FBQSxZQUFBLEdBQUE7QUFDQSxPQUFBLE9BQUEsS0FBQSxVQUFBLEVBQUEsT0FBQTtBQUNBLFVBQUEsRUFBQSxDQUFBO0FBQ0EsYUFBQSxFQUFBLENBQUE7R0FDQTs7QUFFQSxHQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLDJCQUFBLEVBQUEsVUFBQSxDQUFBLEVBQUE7QUFDQSxPQUFBLFNBQUEsRUFBQSxPQUFBO0FBQ0EsT0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLFVBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQ0EsY0FBQSxFQUFBLENBQUE7SUFDQSxNQUFBO0FBQ0EsZ0JBQUEsRUFBQSxDQUFBO0lBQ0E7R0FDQSxDQUFBLENBQUE7O0FBRUEsR0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxDQUFBLEVBQUE7QUFDQSxPQUFBLFNBQUEsRUFBQSxPQUFBO0FBQ0EsT0FBQSxDQUFBLENBQUEsS0FBQSxLQUFBLEVBQUEsRUFBQTtBQUNBLGNBQUEsRUFBQSxDQUFBO0lBQ0EsTUFBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLEtBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxDQUFBO0lBQ0E7R0FDQSxDQUFBLENBQUE7RUFDQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgncG9ydGZvbGlvJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICR1cmxNYXRjaGVyRmFjdG9yeVByb3ZpZGVyKSB7XG5cblx0Ly8gdGhpcyBtYWtlcyB0aGUgJy9zdG9yZXMvJyByb3V0ZSBjb3JyZWN0bHkgcmVkaXJlY3QgdG8gJy9zdG9yZXMnXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5ydWxlKGZ1bmN0aW9uICgkaW5qZWN0b3IsICRsb2NhdGlvbikge1xuXG5cdFx0dmFyIHJlID0gLyguKykoXFwvKykoXFw/LiopPyQvO1xuXHRcdHZhciBwYXRoID0gJGxvY2F0aW9uLnVybCgpO1xuXG5cdFx0aWYocmUudGVzdChwYXRoKSkge1xuXHRcdFx0cmV0dXJuIHBhdGgucmVwbGFjZShyZSwgJyQxJDMnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xuXHQvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG5cdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcblx0JHVybFJvdXRlclByb3ZpZGVyLndoZW4oJy9hdXRoLzpwcm92aWRlcicsIGZ1bmN0aW9uICgpIHtcblx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdH0pO1xuXHQvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7XG4iLCJhcHAuY29udHJvbGxlcignYWJvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcblx0dmFyIGluY3JlbWVudCA9IDA7XG5cdHZhciBjYXJvdXNlbCA9ICQoJyNjYXJvdXNlbCcpO1xuXHR2YXIgY3VycmVudCA9ICcjZmlnLTEnO1xuXHR2YXIgcHJldjtcblx0c2V0SW50ZXJ2YWwoIGZ1bmN0aW9uKCl7XG5cdFx0aW5jcmVtZW50Kys7XG5cdFx0Y2Fyb3VzZWwuY3NzKHtcblx0XHRcdCctd2Via2l0LXRyYW5zZm9ybSc6ICdyb3RhdGVYKCcgKyAoaW5jcmVtZW50ICogLTYwKSArICdkZWcpJ1xuXHRcdH0pO1xuXHRcdGNhcm91c2VsLmF0dHIoJ2RhdGEtc3RhdGUnLChpbmNyZW1lbnQgJSA2KSArIDEpO1xuXG5cdFx0cHJldiA9IGN1cnJlbnQ7XG5cdFx0Y3VycmVudCA9ICcjZmlnLScgKyAgKyAoKGluY3JlbWVudCAlIDYpICsgMSk7XG5cdFx0Y29uc29sZS5sb2coY3VycmVudCk7XG5cdFx0JChjdXJyZW50KS5jc3Moeydib3JkZXItcmFkaXVzJyA6ICczMHB4J30pO1xuXHRcdCQocHJldikuY3NzKHsnYm9yZGVyLXJhZGl1cycgOiAnMHB4J30pO1xuXG5cdH0sMTUwMCk7XG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdjb250YWN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApe1xuXHQkc2NvcGUuZm9ybURhdGEgPSB7fTtcblxuXHQkc2NvcGUuc2VuZE1haWwgPSBmdW5jdGlvbigpe1xuXHRcdCRzY29wZS53YWl0aW5nID0gdHJ1ZTtcblx0XHQkc2NvcGUuc2VudCA9IGZhbHNlO1xuXHRcdCRzY29wZS5zdWNjZXNzID0gZmFsc2U7XG5cdFx0JGh0dHAucG9zdCgnL2FwaS9jb250YWN0JywgJHNjb3BlLmZvcm1EYXRhKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHN1Y2Nlc3NSZXNwb25zZSl7XG5cdFx0XHRjb25zb2xlLmxvZyhzdWNjZXNzUmVzcG9uc2UpO1xuXHRcdFx0JHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcblx0XHRcdCRzY29wZS5zZW50ID0gdHJ1ZTtcblx0XHRcdCRzY29wZS5zdWNjZXNzID0gc3VjY2Vzc1Jlc3BvbnNlLmRhdGE7XG5cdFx0XHQkc2NvcGUuZm9ybURhdGEgPSB7fTtcblx0XHR9KTtcblx0fTtcbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyXG5cdC5zdGF0ZSgnaG9tZScsIHtcblx0XHR1cmw6ICcvJyxcblx0XHR0ZW1wbGF0ZVVybDogJy9qcy90ZW1wbGF0ZXMvaG9tZS5odG1sJ1xuXHR9KVxuXHQuc3RhdGUoJ3Byb2plY3RzJywge1xuXHRcdHVybDogJy9wcm9qZWN0cycsXG5cdFx0dGVtcGxhdGVVcmw6ICcvanMvdGVtcGxhdGVzL3Byb2plY3RzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdwcm9qZWN0Q3RybCdcblx0fSlcblx0LnN0YXRlKCdhYm91dCcsIHtcblx0XHR1cmw6ICcvYWJvdXQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnL2pzL3RlbXBsYXRlcy9hYm91dC5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnYWJvdXRDdHJsJ1xuXHR9KVxuXHQuc3RhdGUoJ2NvbnRhY3QnLCB7XG5cdFx0dXJsOiAnL2NvbnRhY3QnLFxuXHRcdHRlbXBsYXRlVXJsOiAnL2pzL3RlbXBsYXRlcy9jb250YWN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdjb250YWN0Q3RybCdcblx0fSk7XG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdwcm9qZWN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG5cdFx0dmFyIGN1clBhZ2UgPSAxO1xuXHRcdHZhciBudW1PZlBhZ2VzID0gJChcIi5za3ctcGFnZVwiKS5sZW5ndGg7XG5cdFx0dmFyIGFuaW1UaW1lID0gMTAwMDtcblx0XHR2YXIgc2Nyb2xsaW5nID0gZmFsc2U7XG5cdFx0dmFyIHBnUHJlZml4ID0gXCIuc2t3LXBhZ2UtXCI7XG5cblx0XHRmdW5jdGlvbiBwYWdpbmF0aW9uKCkge1xuXHRcdFx0c2Nyb2xsaW5nID0gdHJ1ZTtcblxuXHRcdFx0JChwZ1ByZWZpeCArIGN1clBhZ2UpLnJlbW92ZUNsYXNzKFwiaW5hY3RpdmVcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0XHQkKHBnUHJlZml4ICsgKGN1clBhZ2UgLSAxKSkuYWRkQ2xhc3MoXCJpbmFjdGl2ZVwiKTtcblx0XHRcdCQocGdQcmVmaXggKyAoY3VyUGFnZSArIDEpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0c2Nyb2xsaW5nID0gZmFsc2U7XG5cdFx0XHR9LCBhbmltVGltZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbmF2aWdhdGVVcCgpIHtcblx0XHRcdGlmIChjdXJQYWdlID09PSAxKSByZXR1cm47XG5cdFx0XHRjdXJQYWdlLS07XG5cdFx0XHRwYWdpbmF0aW9uKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbmF2aWdhdGVEb3duKCkge1xuXHRcdFx0aWYgKGN1clBhZ2UgPT09IG51bU9mUGFnZXMpIHJldHVybjtcblx0XHRcdGN1clBhZ2UrKztcblx0XHRcdHBhZ2luYXRpb24oKTtcblx0XHR9XG5cblx0XHQkKGRvY3VtZW50KS5vbihcIm1vdXNld2hlZWwgRE9NTW91c2VTY3JvbGxcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0aWYgKHNjcm9sbGluZykgcmV0dXJuO1xuXHRcdFx0aWYgKGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhID4gMCB8fCBlLm9yaWdpbmFsRXZlbnQuZGV0YWlsIDwgMCkge1xuXHRcdFx0XHRuYXZpZ2F0ZVVwKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuYXZpZ2F0ZURvd24oKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCQoZG9jdW1lbnQpLm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRpZiAoc2Nyb2xsaW5nKSByZXR1cm47XG5cdFx0XHRpZiAoZS53aGljaCA9PT0gMzgpIHtcblx0XHRcdFx0bmF2aWdhdGVVcCgpO1xuXHRcdFx0fSBlbHNlIGlmIChlLndoaWNoID09PSA0MCkge1xuXHRcdFx0XHRuYXZpZ2F0ZURvd24oKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
