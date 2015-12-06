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

app.controller('homeCtrl', function($scope, $state){
		$scope.$state = $state;
		var increment = 0;
		var carousel = $('#carousel');
		var current = '#fig-1';
		var prev;
		var theWindow = $(window);
		var interval;
		var bars = $('#static-bars > li');
		var header = $('.left-col');

		if (theWindow.width() > 768) {
			interval = setInterval(rotate,1500);
		} else {
			var speed;
			bars.each(function(index){
				speed = (index + 1) * 0.3;
				$(this).css({'animation':'slideInLeft ' + speed + 's'});
			});
			header.removeClass("animated").removeClass('flipInX');
		}

		theWindow.resize(function() {
			clearInterval(interval);
			if (theWindow.width() > 768) {
				$('html,body').scrollTop(0);
				interval = setInterval(rotate,1500);
			}
		});

		function rotate(){
			increment++;
			carousel.css({'-webkit-transform': 'rotateX(' + (increment * -120) + 'deg)'});
			carousel.attr('data-state',(increment % 3) + 1);
			prev = current;
			current = '#fig-' + ((increment % 3) + 1);
		}
});
