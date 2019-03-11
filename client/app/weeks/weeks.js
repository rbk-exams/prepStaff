angular.module('prep.weeks',[])

.controller('WeeksController',function($scope , $location, Weeks, Auth,$window, $rootScope, Solutions){
    $scope.weeks = {};
	$rootScope.authenticated= true;
	$scope.Solutions=[];
	
	$scope.getAllWeeks = function (){
		Weeks.getLecturesByWeek(1)
		.then(function(resp){
			$scope.weeks['one'] = [];
			for(var i=0; i < resp.results.length ; i++){
				if(resp.results[i]['status']){
					$scope.weeks['one'].push(resp.results[i]);
				}
			}
		})
		Weeks.getLecturesByWeek(2)
		.then(function(resp){
			$scope.weeks['two']=[];
			for(var i=0; i < resp.results.length ; i++){
				if(resp.results[i]['status']){
					$scope.weeks['two'].push(resp.results[i]);
				}
			}
		})
		Weeks.getLecturesByWeek(3)
		.then(function(resp){
			$scope.weeks['three']=[];
			for(var i=0; i < resp.results.length ; i++){
				if(resp.results[i]['status']){
					$scope.weeks['three'].push(resp.results[i]);
				}
			}

		})
		Weeks.getLecturesByWeek(4)
		.then(function(resp){
			$scope.weeks['four']=resp.results;		
		})
		Weeks.getLecturesByWeek(5)
		.then(function(resp){
			$scope.weeks['five']=resp.results;		
		})
	}

	$scope.getAllSolutionLectures = function(){
		Solutions.getAllSolutionLectures()
		.then(function(resp){
			$scope.Solutions.push('Introduction to Repetition');
			$scope.Solutions.push('Iteration with the while loop');
			$scope.Solutions.push('Introduction to Arrays');
			$scope.Solutions.push('Array Iteration with while & for');
			$scope.Solutions.push('Introduction to Objects');
			$scope.Solutions.push('Data Modeling');
			$scope.Solutions.push('Introduction to Higher Order Functions');
			// $scope.Solutions.push('Improved each: Passing Element Indices');
			// $scope.Solutions.push('Improved each: Iterating Over Objects');
			// $scope.Solutions.push('Map');
			// $scope.Solutions.push('Improved Map');
			// $scope.Solutions.push('Filter');
			// $scope.Solutions.push('Reduce');
			// $scope.Solutions.push('Improved Reduce');
			// $scope.Solutions.push('Introduction to Closures');
			// $scope.Solutions.push("Closures Adding Methods");
			// $scope.Solutions.push("Data Modeling with Closures");
			// $scope.Solutions.push("Object Oriented Programming");
		})
	}

	$scope.logout=function(){
		Auth.signout();
	}

	$scope.isAuth = Auth.isAuth();
	$scope.getAllWeeks();
	$scope.getAllSolutionLectures();
})