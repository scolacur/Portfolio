app.controller('contactCtrl', function($scope, $http){
	$scope.formData = {};

	$scope.sendMail = function(){
		$scope.waiting = true;
		$scope.sent = false;
		$scope.success = false;
		$http.post('/api/contact', $scope.formData)
		.then(function(successResponse){
			console.log(successResponse);
			$scope.waiting = false;
			$scope.sent = true;
			$scope.success = successResponse.data;
			$scope.formData = {};
		});
	};

	var card = $('#card');
	var note = $('#note');
	var toggle = true;

	card.click(function(){
		if (toggle){
			card.addClass('slideRight');
			note.css({'display': 'initial'});
		} else {
			card.removeClass('slideRight');
			note.css({'display': 'none'});
		}
		toggle = !toggle;

	});

});
