(function() {
    'use strict';

    angular
        .module('angularSimpleNews')
        .controller('PostViewCtrl', PostViewCtrl);

    PostViewCtrl.$inject = ['$scope', '$routeParams', 'Post', 'AuthService']
    /* @ngInject */
    function PostViewCtrl($scope, $routeParams, Post, AuthService) {
        /*jshint validthis: true */
        var vm = this;
        vm.post = Post.get($routeParams.postID);
        vm.comments = Post.comments($routeParams.postID);

        vm.user = AuthService.user;
        vm.signedIn = AuthService.signedIn;

        vm.addComment = addComment;
        vm.deleteComment = deleteComment;

        function addComment() {
            if (!vm.commentText || vm.commentText === '') {
                return;
            }

            var comment = {
                text: vm.commentText,
                creator: vm.user.profile.username,
                creatorUID: vm.user.uid
            };

            vm.comments.$add(comment);

            vm.commentText = '';
        }

        function deleteComment(comment) {
            vm.comments.$remove(comment);
        }
    }
})();