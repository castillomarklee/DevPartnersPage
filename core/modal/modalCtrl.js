'use strict'

angular.module('app').controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'content',
  function($scope, $uibModalInstance, content) {
  $scope.title = content.title;
  $scope.content = content.content;
  $scope.$on('modal.closing', function(event, reason, closed) {
    if (content.onDismissListener) {
      content.onDismissListener();
    }
  });

  $scope.ok = function() {
    $uibModalInstance.close();
  };

  $scope.onPositive = function() {
    $uibModalInstance.close(true)
  };
  $scope.onNegative = function() {
    $uibModalInstance.dismiss(false);
  };
}]);