
(function() {
	'use strict';

	angular
		.module('angularSimpleNews')
		.controller('PostCtrl', PostCtrl);

	PostCtrl.$inject = ['$scope', '$location', 'Post', 'AuthService'];


	function PostCtrl($scope, $location, Post, AuthService) {
		var vm = this;

		vm.posts = getPost();

		vm.post = {url: 'http://', title:''};
		vm.addPost = addPost;
		vm.deletePost = deletePost;

		vm.user = AuthService.user;


		function getPost() {
			return Post.all();
		}

		function addPost(){
			Post.create(vm.post).then(addPostSuccessFn, addPostErrorFn);

			function addPostSuccessFn(data){
				// vm.posts[data.name] = vm.post;
				vm.post = {url: 'http://', title:''};
				$location.path('/posts/' + data.key());
			}

			function addPostErrorFn(data) {
				alert('error happened while adding post!');
			}
		}

		function deletePost(post){
			// Post.delete({id: postID}, deletePostSuccessFn, deletePostErrorFn);
			Post.delete(post).then(deletePostSuccessFn, deletePostErrorFn);
			function deletePostSuccessFn() {
				// delete vm.posts[postID];
				alert('post deleted!');
			}

			function deletePostErrorFn() {
				alert('error happened while deleting post!');
			}
		}
	}
})();