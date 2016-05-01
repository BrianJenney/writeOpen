'use strict';

angular.module('myApp.feed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'FeedCtrl'
  });
}])

.controller('FeedCtrl', ['$scope', '$firebase','$location', function($scope, $firebase, $location) {
    
    var firebaseObj = new Firebase("https://writesource.firebaseio.com/Articles/");


    var sync = $firebase(firebaseObj)
    $scope.articles = sync.$asArray();
    console.log(sync);

    $scope.read = function(id) {
    var firebaseObj = new Firebase("https://writesource.firebaseio.com/Articles/" + id);


    var sync = $firebase(firebaseObj)
    $scope.post = sync.$asObject();
    console.log($scope.post);

    $(".readPost").css({"opacity": "100", "z-index":"9999"})
}

    $scope.closeMe = function(){
        $(".readPost").css({"opacity": "0", "z-index":"-9999"})
    }


    $scope.plusOne = function(id) {
        var fb = new Firebase("https://writesource.firebaseio.com/Articles/" + id);
 

        var syn = $firebase(fb);
        var likes = syn.$asArray();
        likes.$loaded(function(likes){

            console.log(likes)

        var thisLikes = likes[0].$value
        console.log(likes[0].$value)
        var firebaseObj = new Firebase("https://writesource.firebaseio.com/Articles/" + id);
        var article = $firebase(firebaseObj);


        article.$update({
            likes: thisLikes + 1
        }).then(function(ref) {
            console.log(ref.key()); // bar
        }, function(error) {
            console.log("Error:", error);
        });


        })
        console.log(syn)

        console.log(id);

    }

}]);