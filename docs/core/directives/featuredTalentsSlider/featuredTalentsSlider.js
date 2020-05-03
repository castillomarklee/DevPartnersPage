'use strict';

app.directive('featuredTalentsSlider', function() {
    return {
        restrict: 'E',
        templateUrl: 'core/directives/featuredTalentsSlider/featured-talents-slider.html?v=@@devPartnersFeaturedTalentsVersion',
        scope: {
            adCode: '=ad',
            filter: '=filter'
        },
        controller: [
            '$scope',
            '$window',
            'DevPartnersFeaturedTalents',
            'STATES',
            'MEDIA_QUERY_BP',
            function ($scope, $window, DevPartnersFeaturedTalents, STATES, MEDIA_QUERY_BP) {
                $scope.STATES = STATES;
                // initialize featured talents slides
                var groupSize;
                if ($window.innerWidth >= MEDIA_QUERY_BP.SCREEN_MD) {
                    groupSize = 5;
                } else if ($window.innerWidth >= 800) {
                    groupSize = 4;
                } else if ($window.innerWidth >= 590) {
                    groupSize = 3;
                } else if ($window.innerWidth >= 440) {
                    groupSize = 2;
                } else {
                    groupSize = 1;
                }

                var talentList = DevPartnersFeaturedTalents.getList($scope.filter);
                var groupedTalentsCount = Math.floor( talentList.length / groupSize);
                var lastGroupSize = talentList.length % groupSize;
                if (lastGroupSize > 0) groupedTalentsCount++;

                $scope.groupedTalentsSlides = [];
                for (var gi = 0; gi < groupedTalentsCount; gi++) {
                    var sliceStart = gi * groupSize;
                    var sliceEnd = gi < groupedTalentsCount - 1 ? groupSize + sliceStart : talentList.length;
                    $scope.groupedTalentsSlides.push(_.slice(talentList, sliceStart, sliceEnd));
                }
                
                if (lastGroupSize > 0) {
                    $scope.groupedTalentsSlides[groupedTalentsCount - 1].push({
                        type: 'cta'
                    });
                } else {
                    $scope.groupedTalentsSlides.push({
                        type: 'cta'
                    });
                }

                $scope.getAdCode = function() {
                    return JSON.stringify({ adCode: $scope.adCode });
                };
            }]
    }
});