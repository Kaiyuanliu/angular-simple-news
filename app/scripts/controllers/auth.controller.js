(function() {
    'use strict';

    angular
        .module('angularSimpleNews')
        .controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['$scope', '$location', 'AuthService', 'user'];

    /* @ngInject */
    function AuthCtrl($scope, $location, AuthService, user) {
        /*jshint validthis: true */
        var vm = this;
        if (user) {
        	$location.path('/');
        }

        vm.register = register;
        vm.login = login;
        activate();

        function activate() {
        }


        function register() {
        	AuthService.register(vm.user)
        				.then(registerSuccessFn)
        				.catch(registerErrorFn);

        	function registerSuccessFn(userData) {
        		return AuthService.login(vm.user).then(function(userData) {
        			console.log(userData);
        			userData.username = vm.user.username;
        			return AuthService.createProfile(userData);
        		}).then(function(){
        			$location.path('/');
        		});
        	}

        	function registerErrorFn(error) {
        		vm.error = error.toString();
        		console.log('error: ' + error);
        	}
        }

        function login() {
        	AuthService.login(vm.user)
        				.then(loginSuccessFn)
        				.catch(loginErrorFn);

        	function loginSuccessFn() {
        		$location.path('/');
        	}

        	function loginErrorFn(error) {
        		vm.error = error.toString();
        		console.log('error happened while logging in! ' + error);
        	}

        }
    }
})();