'use strict'

angular.module('app').controller('MainCtrl', ['$scope', '$rootScope', '$localStorage', '$sessionStorage', '$state', '$location', '$dialogContactUs', '$dialogGetPromoCode', '$timeout', 'SPINNER_CONFIGS', 'cfpLoadingBar', '$animate',
    function ($scope, $rootScope, $localStorage, $sessionStorage, $state, $location, $dialogContactUs, $dialogGetPromoCode, $timeout, SPINNER_CONFIGS, cfpLoadingBar, $animate) {
        var vm = this;
        init();

        function init() {
            console.log('%cStop!', 'color: red; font-size: 30px; font-weight: bold;');
            console.log('This is a browser feature intended for developers. If anyone told you to copy and paste something here, it is a scam and will give them access to your credentials and your information.');
            // $timeout(function () {
            //     if (!$state.current.data || !$state.current.data.noPromoSubscriptionPrompt) $dialogGetPromoCode();
            // }, 60000);
        }

        vm.isLoggedIn = function () {
            return $rootScope.currentUser && $rootScope.currentUser.isLoggedIn;
        };

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            //start loading bar on stateChangeStart
            cfpLoadingBar.start();
            if ($location.url().startsWith('/?code=') || $location.url().startsWith('?code=')) {
                var params = $location.search();
                $localStorage.ycode = params.code;
                window.close();
            } else if (window.location.hash) {
                var params = window.location.hash.replace('#', '').split('&');
                var tk = _.find(params, function(item) {
                    return item.startsWith('access_token=');
                });
                if (tk) {
                    $localStorage.mstk = tk.replace('access_token=', '');
                }
            } else if ($rootScope.currentUser && $rootScope.currentUser.isLoggedIn) {
                if ($rootScope.currentUser.isClient()) {
                    if (toState.name === $scope.STATES.HOME) {
                        event.preventDefault();
                        var params = $location.search();
                        if (params && params.referenceCode) {
                            $state.go($scope.STATES.WELCOME, { referenceCode: params.referenceCode });
                        } else {
                            $state.go($scope.STATES.WELCOME);
                        }
                    } else if (toState.startsWith($scope.STATES.ADMIN + '.') || toState.name === $scope.STATES.VERIFICATION || toState.name === $scope.STATES.LOGIN) {
                        event.preventDefault();
                        $state.go($scope.STATES.WELCOME);
                    }
                } else if ($rootScope.currentUser.isAdmin()) {
                    if (toState.name === $scope.STATES.HOME || toState.name.startsWith($scope.STATES.APP + '.') || toState.name === $scope.STATES.VERIFICATION || toState.name === $scope.STATES.LOGIN) {
                        event.preventDefault();
                        $state.go($scope.STATES.ADMIN_DASHBOARD);
                    }
                }
            } else {
                if (toState.data && toState.data.requireLogin) {
                    event.preventDefault();
                    var params = $location.search();
                    if (params && params.referenceCode) {
                        $state.go($scope.STATES.LOGIN, { stateToRedirectTo: toState.name, referenceCode: params.referenceCode });
                    } else {
                        $state.go($scope.STATES.LOGIN, { stateToRedirectTo: toState.name });
                    }
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //stop loading bar on stateChangeSuccess
            event.targetScope.$watch("$viewContentLoaded", function () {
                if (!window.loading_screen.isFinished) window.loading_screen.finish();
                cfpLoadingBar.complete();
            });

            $("html, body").animate({ scrollTop: 0 }, 400);
            if (!$rootScope.currentUser || !$rootScope.currentUser.isAdmin()) {
                // FacebookPixelService.trackPageView();
            }

            vm.isHomePage = toState.name === 'home';
            if (fromState.name === 'externalSignup') {
                if (toState.name !== 'signup') {
                    delete $sessionStorage.passedQuote;
                }
            } else if (fromState.name === 'requestQuote' || fromState.name === 'scheduleCall' || fromState.name === 'signup') {
                if (fromState.name !== toState.name) {
                    delete $sessionStorage.passedQuote;
                }
            } else if (toState.name !== 'requestQuote' && toState.name !== 'scheduleCall' && toState.name !== 'signup' && toState.name !== 'externalSignup') {
                delete $sessionStorage.passedQuote;
            } else if (toState.name !== 'externalSignup') {
                delete $sessionStorage.passedProvider;
                delete $sessionStorage.passedMissingFields;
            }

            // vm.hideChatButton = toState.data && toState.data.hideChatButton;
            // vm.hideChatButton =  toState.data.hideChatButton;
            vm.hideChatButton =  true;
        });

        $rootScope.openContactUs = function () {
            //TODO: remove. this shouldn't be here.
            $dialogContactUs();
        };

        //spinner configs
        $scope.spinnerSM = SPINNER_CONFIGS.spinnerSM;
        $scope.spinnerMD = SPINNER_CONFIGS.spinnerMD;
        $scope.spinnerLG = SPINNER_CONFIGS.spinnerLG;
    }]);