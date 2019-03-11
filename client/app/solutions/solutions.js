angular.module('prep.solutions',['hljs'])

.controller('solutionsController',function( $scope, Solutions, $routeParams ){

	$scope.lecture=$routeParams.lecture;
	$scope.solutionsQuestions = [];
	$scope.slide = "";
	
	
	$scope.getLectureSolutions = function(){
		Solutions.getLectureSolutions($routeParams.lecture)
		.then(function(resp){
			$scope.solutionsQuestions = resp.answers;
			if(resp.answers[0]){
				if(resp.answers[0].slide){
					$scope.slide= resp.answers[0]['slide'];				
				}
			}
			
		})
	}
	
	//get all solutions
	$scope.getLectureSolutions();
})