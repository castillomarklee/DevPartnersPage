'use strict'

angular.module('app').controller('WhyCtrl', ['$window','$location', 'CONST_COMMON', 'SCROLLBAR_CONFIG', 'MEDIA_QUERY_BP', '$rootScope',
    function ($window,$location,WhyFAQs, CONST_COMMON, SCROLLBAR_CONFIG, MEDIA_QUERY_BP, $rootScope) {
        // $rootScope.hideNavMenus = false;
        var vm = this;
        vm.comparisons = [
            {
                "title": 'Employee',
                "leadTimeStart": '1–3 months',
                "recruitingFee": '15K–25K',
                "qualityOfWork": 'Unpredictable',
                "terminationFee": 'High',
                "overheadCosts": 'High',
                "preScreened": 'Maybe',
                "hasWarning": true
            }, {
                "title": 'Dev Partners',
                "leadTimeStart": '0–2 weeks',
                "recruitingFee": '$0',
                "qualityOfWork": 'High',
                "terminationFee": '$0',
                "overheadCosts": '$0',
                "preScreened": 'Yes',
                "emphasize": true,
                "logo": 'assets/images/logo-white.png',
                "coverImg": 'assets/images/why/DP-Hero.jpg'
            }, {
                "title": 'Other Contractors',
                "leadTimeStart": '1–4 weeks',
                "recruitingFee": '$0',
                "qualityOfWork": 'Unpredictable',
                "terminationFee": '$0',
                "overheadCosts": '$0',
                "preScreened": 'No',
                "hasWarning": true
            }
        ];
        vm.gotoProcess = function(){
            $location.path('/us/angularjs');
            // alert();
          }
        vm.scrollbarConfig = SCROLLBAR_CONFIG.SCROLLABLE_PANEL;
        // vm.faqs = WhyFAQs.getList();

        vm.isSmallScreen = function() {
            return $window.innerWidth < MEDIA_QUERY_BP.SCREEN_MD;
        }
        vm.isXSmallScreen = function() {
            return $window.innerWidth < MEDIA_QUERY_BP.SCREEN_SM;
        };
    }]);