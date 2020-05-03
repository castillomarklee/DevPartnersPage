'use strict';

app.directive('blogRecommendations', [function () {
    return {
        restrict: 'E',
        controller: 'BlogRecommendationsCtrl',
        controllerAs: 'recommendationsVM',
        templateUrl: 'blogPost/recommendedPosts/recommendations.html?v=4',
        replace: true,
        scope: {
            category: '=category',
            excludedPost: '=excludedPost',
            class: '@class'
        }
    };
}]);