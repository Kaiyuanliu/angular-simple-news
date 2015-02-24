(function() {
    'use strict';

    angular
        .module('angularSimpleNews')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$rootScope', '$firebase', '$firebaseAuth', 'firebaseConstants'];
    /* @ngInject */
    function AuthService($rootScope, $firebase, $firebaseAuth, firebaseConstants) {
    	var ref = new Firebase(firebaseConstants.FIREBASE_URL);
    	var auth = $firebaseAuth(ref);

        function register(user) {
        	var credential = {
        		email: user.email,
        		password: user.password
        	}

        	return auth.$createUser(credential);
        }

        function login(user) {
        	var credential = {
        		email: user.email,
        		password: user.password
        	}

        	return auth.$authWithPassword(credential);
        }

        function logout() {
        	auth.$unauth();
        }

        function resolveUser() {
        	return auth.$getAuth();
        }

        function signedIn() {
        	return !!authService.user.provider;
        }

        function createProfile(user) {
        	var profile = {
        		username: user.username,
        		email: user.password.email
        	};
        	// console.log(profile);
        	var profileRef = $firebase(ref.child('profile'));
        	return profileRef.$set(user.uid, profile);
        }

        auth.$onAuth(function(userData){
        	if (userData) {
        		angular.copy(userData, authService.user);
        		authService.user.profile = $firebase(ref.child('profile').child(authService.user.uid)).$asObject();
        	} else {
        		console.log('logged out');
        		if (authService.user && authService.user.profile) {
        			console.log('destroy');
        			authService.user.profile.$destroy();
        		}
        		angular.copy({}, authService.user);
        	}
        	
        });

        var authService = {
            register: register,
            login: login,
            logout: logout,
            resolveUser: resolveUser,
            signedIn: signedIn,
            createProfile: createProfile,
            user: {}
        };

        return authService;
    }
})();