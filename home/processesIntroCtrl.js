'use strict'

angular.module('app').controller('ProcessesIntroCtrl', ['$scope', '$log', 'ProcessesService', '$uibModal',
  function($scope, $log, ProcessesService, $uibModal) {
  var vm = this;
  vm.processes = ProcessesService.processes;

  vm.viewProcessDetails = function(index) {
    $log.debug('index: ' + index);
    $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'core/modal/call-out-modal.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'modalCtrl',
      windowTopClass: 'modal-callout',
      size: 'md',
      resolve: {
        content: function() {
          return {
            title: vm.processes[index].title,
            content: vm.processes[index].content
          };
        }
      }
    });
  }
}]);