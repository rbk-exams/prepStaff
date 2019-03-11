angular.module('prep.services',[])

.factory('Auth',function($http, $window, $location){

	var signin = function(user) {
		return $http({
			method : 'POST',
			url : 'api/users/signin',
			data : user
		})
		.then(function(resp){
			return resp.data;
		})
		.catch(function(error){
			return error;
		})
	};

	var signup = function(user) {
		return $http({
			method : 'POST',
			url : '/api/users/signup',
			data : user
		})
		.then(function(resp){
			return resp.data;
		})
		.catch(function(error){
			return error;
		})
	};
	
	var isAuth = function () {
    	return !!$window.localStorage.getItem('rbk.prep');
  	};

	var signout = function () {
    	$window.localStorage.removeItem('rbk.prep');
    	$location.path('/');
  	};

	return{
		signin : signin,
		signup : signup,
		isAuth : isAuth,
		signout : signout
	}
})

.factory('Weeks',function($http){
	var getLecturesByWeek = function (week){
		return $http({
			method : 'GET',
			url: '/api/lectures/getLectureByWeek/' + week
		})
		.then(function(resp){
			return resp.data;
		})
		.catch(function(error){
			return error;
		})
	}
	return {
		getLecturesByWeek : getLecturesByWeek
	}
})
.factory('Contents',function($http){
	var getLectureByTitle = function(title){
		return $http({
			method : 'GET',
			url : '/api/lectures/getLectureByTitle/' + title
		})
		.then(function(resp){
			return resp.data;
		})
		.catch(function(error){
			return error;
		})
	}

	var getLectureQuestions = function (lectureID){
		return $http({
			method : 'GET' ,
			url : '/api/questions/getAllLectureQuestions/' + lectureID
		})
		.then(function(resp){
			return resp.data;
		})
		.catch(function(error){
			return error;
		})
	}
	
	return {
		getLectureByTitle : getLectureByTitle ,
		getLectureQuestions : getLectureQuestions
	}
})
.factory('Solutions',function($http){
	var getLectureSolutions = function(lecture) { 
		return $http({
			method : 'GET' ,
			url : '/api/solutions/getAllLectureSolutions/' + lecture
		})
		.then(function(resp){
			return resp.data;
		})
		.catch(function(error){
			return error;
		})
	}

	var getAllSolutionLectures = function(){
		return $http({
			method : 'GET',
			url : '/api/solutions/getAllSolutionLectures'
		})
		.then(function(resp){
			return resp.data;
		})
		.catch(function(error){
			return error;
		})
	}
	return {
		getLectureSolutions : getLectureSolutions,
		getAllSolutionLectures : getAllSolutionLectures
	}
})
