(function() {
    'use strict';

    angular
        .module('angularSimpleNews')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$routeParams', 'ProfileService', 'Post']
    /* @ngInject */
    function ProfileCtrl($routeParams, ProfileService, Post) {
        /*jshint validthis: true */
        var vm = this;
        
       	vm.posts = [];
       	vm.profile = undefined;

        function activate() {
        	var userID = $routeParams.userID;


        	function profilePostSuccessFn(data){
        		vm.posts = data;
        	}

        	function profilePostErrorFn(data){
        		console.log('error happened while getting posts');
        	}

        	ProfileService.getPost(userID).then(profilePostSuccessFn, profilePostErrorFn);
        	vm.profile = ProfileService.getUserProfile(userID);
        }

        activate();
    }
})();