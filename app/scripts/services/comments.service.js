(function() {
    'use strict';

    angular
        .module('angularSimpleNews')
        .factory('CommentService', CommentService);

    CommentService.$inject = ['$firebase', 'firebaseConstants'];
    /* @ngInject */
    function CommentService($firebase, firebaseConstants) {
    	var ref = new Firebase(firebaseConstants.FIREBASE_URL);
        var commentService = {
            func: func
        };
        return commentService;

        ////////////////

        function func() {
        }
    }
})();