app.controller('contactCtrl', function($scope, $http){
	$scope.formData = {};

	$scope.sendMail = function(){
		$scope.sent = false;
		$scope.success = false;
		console.log('sending mail');
		$http.post('/api/contact', $scope.formData)
		.then(function(successResponse){
			console.log("response: ",successResponse);
			$scope.sent = true;
			$scope.success = successResponse.data;
			$scope.formData = {};
		});
	};
});
