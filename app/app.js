'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngDialog',
  'ngRoute',
  'myApp.home',
  'myApp.register',
  'myApp.welcome',
  'myApp.addPost',
  'myApp.feed'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
