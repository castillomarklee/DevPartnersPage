'use strict';

angular.module('app').controller('LandingCtrl', ['$scope', '$location', '$rootScope', '$timeout',
  function ($scope, $location, $rootScope, $timeout) {
    $rootScope.hideNavMenus = true;
    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.hideNavMenus = false;
    });
    // $scope.videoID = 'usXGHRaWXOs';

    // Gets fired when the state of the iframe player changes
    // $scope.playerStateChanged = function (event) {
    //   if (event.data == 0) {
    //       $timeout(function() {
    //         $location.path("/process")
    //     }, 1);
    //   }
    // };


    // $scope.videoSrc = 'https://www.youtube.com/embed/usXGHRaWXOs'
    // $scope.videoEnd = function(){
    //   $location.path('/process');
    // };


    //     setTimeout(function() {
    //         $uibModalInstance.dismiss('cancel');
    //     }, 44000);
    //   $scope.dissmissVideo = function() {

    //     $uibModalInstance.dismiss('cancel');
    //   };
    //   $scope.onError = function(error) {
    //     $uibModalInstance.close();
    //     $dialogAlert(CONST_COMMON.GENERIC_ERROR_TITLE, CONST_COMMON.MESSAGE_FAILED);
    //   };

  }
]);
