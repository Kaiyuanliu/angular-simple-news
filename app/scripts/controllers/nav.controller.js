(function() {
    'use strict';

    angular
        .module('angularSimpleNews')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['$scope', '$location', 'Post', 'AuthService'];

    /* @ngInject */
    function NavbarCtrl($scope, $location, Post, AuthService) {
        /*jshint validthis: true */
        var vm = this;
        vm.post = {url: 'http://', title: ''};

        vm.addPost = addPost;
        vm.signedIn = AuthService.signedIn;
        vm.logout = AuthService.logout;
        vm.user = AuthService.user;

        function addPost() {
            vm.post.creator = vm.user.profile.username;
            vm.post.creatorUID = vm.user.uid;
        	Post.create(vm.post).then(addPostSuccessFn, addPostErrorFn);

        	function addPostSuccessFn(data) {
        		vm.post = {url: 'http://', title: ''};
        		$location.path('/posts/' + data.key());
        	}

        	function addPostErrorFn(data) {
        		alert('error happened while adding post from nav');
        	}
        }
    }
})();