'use strict'

angular.module('app').controller('GenericPageController', ['$scope' , '$sce', '$uibModal', '$stateParams', 'ProcessesService',
  function($scope, $sce, $uibModal, $stateParams, ProcessesService) {
  $scope.img = $stateParams.pageDetails.headerImage;
  $scope.title = $stateParams.pageDetails.title;
  $scope.content = $stateParams.pageDetails.content;
}]);