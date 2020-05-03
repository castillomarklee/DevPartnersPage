'use strict';

angular.module('app').controller('BlogArchiveCtrl', [
    'BlogCoverage', function(BlogCoverage) {

        var vm = this;
        init();

        function init() {
            vm.archives = new BlogCoverage();
            vm.loadingArchives = true;
            vm.archives.load().then(function(response) {
                vm.loadingArchives = false;
            });
        }

        vm.onMonthGroupClick = function(monthGroup, year) {
            if (!monthGroup.isOpen) {
                if (!monthGroup.posts || monthGroup.posts.length === 0) {
                    vm.disableAccordion = true;
                    monthGroup.loadingPosts = true;
                    vm.archives.loadMonthOfYearPosts(monthGroup.month, year).then(function(response) {
                        monthGroup.loadingPosts = false;
                        vm.disableAccordion = false;
                    });
                }
            }
        };

        vm.loadMore = function(monthGroup, year) {
            vm.disableAccordion = true;
            monthGroup.loadingPosts = true;
            vm.archives.loadMonthOfYearPosts(monthGroup.month, year).then(function (response) {
                monthGroup.loadingPosts = false;
                vm.disableAccordion = false;
            });
        };
}]);