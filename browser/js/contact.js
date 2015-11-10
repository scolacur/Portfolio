app.controller('contactCtrl', function($scope, $http){
	$scope.data = {};

	$scope.sendMail = function(){
		$scope.sent = false;
		$scope.success = false;

		$http.post('/api/contact', $scope.data)
		.then(function(successResponse){
			$scope.sent = true;
			$scope.success = successResponse.data;
			$scope.data = {};
		});
	};
});
