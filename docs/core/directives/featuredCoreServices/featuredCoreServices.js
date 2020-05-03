'use strict';

app.directive('featuredCoreServices', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'core/directives/featuredCoreServices/featured-core-services.html?v=@@featuredCoreServicesVersion',
        scope: {
            class: '@class'
        },
        link: function(scope, element, attrs) {
            attrs.$set('class', scope.class);
        },
        controller: ['$scope', 'CoreServices',
            function ($scope, CoreServices) {
                $scope.featuredServices = _.slice(CoreServices.getList(), 0, 2);
            }]
    };
});