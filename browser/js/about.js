app.controller('aboutCtrl', function($scope){
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
		current = '#fig-' +  + ((increment % 6) + 1);
		console.log(current);
		$(current).css({'border-radius' : '30px'});
		$(prev).css({'border-radius' : '0px'});

	},1500);
});
