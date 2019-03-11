angular.module('prep.calendar',[])

.controller('CalendarController',function($scope, $rootScope){
    $scope.announcements="Remember to Smile :)";
    $rootScope.authenticated= true;    
})