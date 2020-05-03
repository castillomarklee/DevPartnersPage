'use strict';

angular.module('app').controller('DevelopersCtrl', [
    '$location',
    'DPTalentPool',
    'CoreServices',
    'Testimonials',
    '$rootScope',
    function ($location,DPTalentPool, CoreServices, Testimonials, $rootScope) {
        $rootScope.hideNavMenus = false;

        var vm = this;
        vm.coreServices = CoreServices.getList();
        vm.talents = DPTalentPool.developers();
        vm.testimonials = Testimonials.getList();
        vm.eventLabel = "developers";
        vm.showHireButton = true;
        vm.gotoProcess = function(){
            $location.path('/us/angularjs');
            // alert();
          }
        vm.getAdCode = function () {
            return JSON.stringify({
                adCode: vm.eventLabel
            });
        };

    }
]);