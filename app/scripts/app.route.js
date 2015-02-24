(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name angularSimpleNews
   * @description
   * # angularSimpleNews
   *
   * Main module of the application.
   */
  angular
    .module('angularSimpleNews', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'firebase'
    ])
    .config(config);

    function config($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/posts.html',
          controller: 'PostCtrl',
          controllerAs: 'vm'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .when('/posts/:postID', {
          controller: 'PostViewCtrl',
          controllerAs: 'vm',
          templateUrl: 'views/showpost.html'
        })
        .when('/register', {
          controller: 'AuthCtrl',
          controllerAs: 'vm',
          resolve: {
            user: function(AuthService) {
              return AuthService.resolveUser();
            }
          },
          templateUrl: 'views/register.html'
        })
        .when('/login', {
          controller: 'AuthCtrl',
          controllerAs: 'vm',
          templateUrl: 'views/login.html',
          resolve: {
            user: function(AuthService) {
              return AuthService.resolveUser();
            }
          }
        })
        .when('/users/:userID', {
          controller: 'ProfileCtrl',
          controllerAs: 'vm',
          templateUrl: 'views/profile.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
})();


