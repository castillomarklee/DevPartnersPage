'use strict';

angular.module('app').controller('FeaturedPostsCtrl', ['$scope', '$window', 'BlogEntries', 'MEDIA_QUERY_BP',
    function ($scope, $window, BlogEntries, MEDIA_QUERY_BP) {

        var vm = this;
        init();

        var getGroupSize = function () {
            if (vm.groupSize) {
                return vm.groupSize;
            } else if ($window.innerWidth >= MEDIA_QUERY_BP.SCREEN_MD) {
                return 3;
            } else if ($window.innerWidth >= MEDIA_QUERY_BP.SCREEN_SM) {
                return 2;
            } else {
                return 1;
            }
        };

        function init() {
            vm.featuredPosts = new BlogEntries();
            vm.featuredPostsLoaded = false;
            vm.featuredPosts.getFeaturedPosts().then(function (response) {
                if (response.success) {
                    var groupSize = getGroupSize();
                    var groupedPostsCount = Math.floor(vm.featuredPosts.featured.length / groupSize);
                    var lastGroupSize = vm.featuredPosts.featured.length % groupSize;
                    if (lastGroupSize > 0) groupedPostsCount++;

                    vm.groupedFeaturedPosts = [];
                    for (var gi = 0; gi < groupedPostsCount; gi++) {
                        var sliceStart = gi * groupSize;
                        var sliceEnd = gi < groupedPostsCount - 1 ? groupSize + sliceStart : vm.featuredPosts.featured.length;
                        vm.groupedFeaturedPosts.push(_.slice(vm.featuredPosts.featured, sliceStart, sliceEnd));
                    }
                }
                vm.featuredPostsLoaded = true;
            });
        }

        vm.isScreenDefault = function () {
            return $window.innerWidth > MEDIA_QUERY_BP.SCREEN_SM;
        };
        vm.isScreenSM = function () {
            return $window.innerWidth <= MEDIA_QUERY_BP.SCREEN_SM && $window.innerWidth > MEDIA_QUERY_BP.SCREEN_XS;
        };
        vm.isScreenXS = function () {
            return $window.innerWidth <= MEDIA_QUERY_BP.SCREEN_XS;
        };

        vm.setGroupSize = function (size) {
            vm.groupSize = size;
        };
    }]);