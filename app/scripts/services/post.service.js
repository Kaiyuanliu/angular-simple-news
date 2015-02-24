(function() {
	'use strict';

	angular
		.module('angularSimpleNews')
		.factory('Post', Post);

	Post.$inject = ['$resource', '$firebase', 'firebaseConstants'];


	function Post($resource, $firebase, firebaseConstants) {
		var ref = new Firebase(firebaseConstants.FIREBASE_URL);
		var posts = $firebase(ref.child('posts')).$asArray();

		var Post = {
			all: all,
			create: create,
			get: get,
			delete: deletePost,
			comments: comments
		};

		return Post;

		function all() {
			return posts;
		}

		function get(postID) {
			return $firebase(ref.child('posts').child(postID)).$asObject();
		}

		function create(post) {
			console.log(post);
			return posts.$add(post)
						.then(createSuccessFn)
						.catch(createErrorFn);

			function createSuccessFn(postRef) {
				$firebase(ref.child('user_posts').child(post.creatorUID))
										.$push(postRef.key());
				return postRef;
			}

			function createErrorFn() {
				console.log('error happened while creating post');
			}
		}

		function deletePost(post) {
			return posts.$remove(post);
		}

		function comments(postID) {
			return $firebase(ref.child('comments').child(postID)).$asArray();
		}
		// return $resource('https://vivid-torch-8164.firebaseio.com/posts/:id.json');
	}
})();