app.controller('aboutCtrl', function($scope){
	var increment = 0;
	var carousel = $('#carousel');

	setInterval( function(){
		increment++;
		carousel.css({
			'-webkit-transform': 'rotateX(' + (increment * -60) + 'deg)'
		});
		var pastSix = -1;
		if(increment >= 6){
			increment = 0;
		}
		carousel.attr('data-state',(increment % 6)+1);
	},1500);
});
