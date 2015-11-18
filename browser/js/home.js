app.config(function($stateProvider){
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/js/templates/home.html',
		controller: 'homeCtrl'
	})
	.state('projects', {
		url: '/projects',
		templateUrl: '/js/templates/projects.html',
		controller: 'projectCtrl'
	})
	.state('about', {
		url: '/about',
		templateUrl: '/js/templates/about.html',
		controller: 'aboutCtrl'
	})
	.state('contact', {
		url: '/contact',
		templateUrl: '/js/templates/contact.html',
		controller: 'contactCtrl'
	});
});

app.controller('homeCtrl', function(){
	var increment = 0;
	var carousel = $('#carousel');
	var current = '#fig-1';
	var prev;
	setInterval( function(){
		increment++;
		carousel.css({
			'-webkit-transform': 'rotateX(' + (increment * -60) + 'deg)'
		});
		carousel.attr('data-state',(increment % 6) + 1);

		prev = current;
		current = '#fig-' + ((increment % 6) + 1);
	},1500);

	// var circle1 = $('#circle-1');
	// console.log('$circle-1', circle1);
	// var circle2 = $('#circle-2');
	// // var circle3 = $('#circle-3');
	//
	// circle1.click(function(){
	// 	circle1.addClass('spin-clockwise');
	// 	setTimeout(function(){
	// 		circle2.addClass('spin-counterclockwise');
	// 	},500);
	// });
});
