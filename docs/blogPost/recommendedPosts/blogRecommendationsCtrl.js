'use strict';

angular.module('app').controller('BlogRecommendationsCtrl', [
    '$scope',
    'BlogEntries',
    'STATES', function ($scope, BlogEntries, STATES) {
        var vm = this;
        vm.recommendedPosts = new BlogEntries();
        $scope.STATES = STATES;

        init();

        function init() {
            vm.loadingRecommendations = true;
            vm.recommendedPosts.getRecommendations($scope.category, $scope.excludedPost).then(function(response) {
                vm.loadingRecommendations = false;
            });
        }
}]);