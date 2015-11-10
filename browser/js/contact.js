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
});
