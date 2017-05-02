'use strict';

angular.module('gitApp', []).controller('gitCtrl', function($scope, $http){

	$scope.loading = false;
	$scope.userCards = [];

	$scope.searchProfile = function(){
		$scope.userNotFound = false;
		$scope.isUserPresent = false;
		angular.forEach($scope.userCards, function(user, key){
			if (user.login == $scope.search) {
				$scope.isUserPresent = true;
			}
		});
		if (!$scope.isUserPresent) {
			$scope.loading = true;
			var user = $scope.search;
			var url = 'https://api.github.com/users/' + user;

			$http.get(url).success(function(response){
				$scope.userNotFound = false;
				$scope.loading = false;
				$scope.userCards.push(response);

			}).error(function(response){
				$scope.userNotFound = true;
				$scope.loading = false;
			})
		}
		else {
			alert("User already present!");
		}
	}

	$scope.removeUser = function(user) {
		$scope.userCards.splice($scope.userCards.indexOf(user), 1);
	}

	$scope.setSortBy = function(sortBy) {
		$scope.sort = sortBy;
		$scope.selectedSortCSS = {'color':'#0000ff'};
	}
})