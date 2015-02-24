(function() {
    'use strict';

    angular
        .module('angularSimpleNews')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$firebase', 'firebaseConstants', 'Post', '$q']
    /* @ngInject */
    function ProfileService($firebase, firebaseConstants, Post, $q) {

    	var ref = new Firebase(firebaseConstants.FIREBASE_URL);

        function getUserProfile(userID) {
        	return $firebase(ref.child('profile').child(userID)).$asObject();
        }

        function getPost(userID){
        	var defer = $q.defer();
        	
        	$firebase(ref.child('user_posts').child(userID))
        		.$asArray()
				.$loaded()
				.then(function(data){
					var posts = {};
					data.forEach(function(oneData){
						if(oneData.hasOwnProperty("$value")){
							var value = oneData.$value;
							posts[value] = Post.get(value);
						}
					})
					defer.resolve(posts);
				});
        	return defer.promise;
        }

        var service = {
            getUserProfile: getUserProfile,
            getPost: getPost
        };

        return service;
    }
})();