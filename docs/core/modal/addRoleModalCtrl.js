'use strict'

angular.module('app').controller('AddRoleCtrl', [
  '$scope', '$log', '$uibModalInstance', '$timeout',
  'team', 'BuildTeamService', 'ContractType',
  'CONST_TEAM', 'MobileChecker', 'Toast',
  function ($scope, $log, $uibModalInstance, $timeout, team, BuildTeamService, ContractType, CONST_TEAM, MobileChecker, Toast) {
  $scope.newRole = {
    name: '',
    contractTypeId: '',
    rate: CONST_TEAM.CUSTOM_ROLE_RATE
  };

  var renderDropdown = function() {
    $timeout(function() {
      if (MobileChecker.isMobile()) {
        $('.selectpicker').selectpicker('mobile');
      }
      $('.selectpicker').selectpicker('refresh');
      $('.selectpicker').selectpicker('render');
    });
  };

  var render

  $scope.init = function() {
    renderDropdown();
    ContractType.getList().then(function(response) {
      if (response.success) {
        $scope.contractTypes = response.data;
        renderDropdown();
      }
    });

    $scope.loadingRoles = true;
    BuildTeamService.initDefaultTeam().then(function(response) {
      if (response.success) {
        $scope.roles = response.data;
      } else {
        Toast.showToast(response.success, response.errorMessage);
      }
      $scope.loadingRoles = false;
    });
  };

  $scope.toggleDropdown = function(target) {
    $log.debug('toggleDropdown');
    $timeout(function () {
      if ($scope.isRolesDropdownOpen) {
        $scope.isRolesDropdownOpen = false;
      } else {
        if ($(target).val() && $(target).val() !== '') {
          $(target).attr('placeholder', $(target).val());
          $scope.newRole.name = "";
        }
        $(target).focus();
        $(target).trigger('input');
        $(target).trigger('change');
      }
    });
  };

  $scope.onRolesBlur = function(target) {
    $log.debug('onRolesBlur');
    $scope.isRolesDropdownOpen = false;
    var previousValue = $(target).attr('placeholder');
    if (previousValue && previousValue !== '') {
      $scope.newRole.name = previousValue;
      $(target).removeAttr('placeholder');
    }
  };

  $scope.addRole = function(isValid) {
    if (isValid) {
      var defaultRole = BuildTeamService.cloneRoleByName($scope.newRole.name);
      if (defaultRole) {
        var selectedContractType = $scope.newRole.contractTypeId;
        angular.extend($scope.newRole, defaultRole);
        $scope.newRole.contractTypeId = selectedContractType;
      } else {
        $scope.newRole.isCustom = true;
      }
      $scope.newRole.teamId = team.id;
      $scope.newRole.contractType = ContractType.getContractType($scope.newRole.contractTypeId);
      $uibModalInstance.close($scope.newRole);
    }
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}]);