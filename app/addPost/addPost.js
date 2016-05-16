'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCtrl'
  });
}])

.controller('AddPostCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
     
	if(!CommonProp.getUser()){
    $location.path('/home');
}
    var login={};
	$scope.login=login;

	$scope.logout = function(){
    CommonProp.logoutUser();
	}
    
    

    $scope.AddPost = function(){
	login.loading = true;

	var title = $scope.article.title;
    var post = $scope.article.post;
    var summary = $scope.article.summary;
    
	
	var firebaseObj = new Firebase("https://writesource.firebaseio.com/Articles/");
	
   	var fb = $firebase(firebaseObj);
        
	var user = CommonProp.getUser();
	


	fb.$push({title: title, post: post,'.priority': user, likes: 0, summary: summary, saved: "false"}).then(function(ref) {
		login.loading = false;
		$location.path('/feed');
	}, function(error) {
		login.loading = false;
  		console.log("Error:", error);
	});

    }

    $scope.Save = function(){
	login.loading = true;

	var title = $scope.article.title;
    var post = $scope.article.post;
    var summary = $scope.article.summary;
    
	
	var firebaseObj = new Firebase("https://writesource.firebaseio.com/Articles/");
	
   	var fb = $firebase(firebaseObj);
        
	var user = CommonProp.getUser();
	


	fb.$push({title: title, post: post,'.priority': user, likes: 0, summary: summary, saved: "true"}).then(function(ref) {
		login.loading = false;
		$location.path('/feed');
	}, function(error) {
		login.loading = false;
  		console.log("Error:", error);
	});

    }
}]);

