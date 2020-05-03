'use strict'

app.factory('$dialogConfirm', ['$uibModal', function ($uibModal) {
    return function (title, message) {
        var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'core/modal/confirmation-modal.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'modalCtrl',
            resolve: {
                content: function () {
                    return {
                        title: title,
                        content: message
                    };
                }
            }
        });

        return modal.result;
    };
}]);

app.factory('$dialogAlert', ['$uibModal', function ($uibModal) {
    return function (title, message, onDismiss) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'core/modal/alert-modal.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'modalCtrl',
            resolve: {
                content: function () {
                    return {
                        title: title,
                        content: message,
                        onDismissListener: onDismiss
                    };
                }
            }
        });
    };
}]);

app.factory('$dialogEditRole', ['$uibModal', function ($uibModal) {
    return function (role) {
        return $uibModal.open({
            templateUrl: 'partials/editTeamRole/edit-team-role.html?v=@@adminEditTeamRoleVersion',
            controller: 'EditTeamRoleCtrl',
            controllerAs: 'editRoleVM',
            resolve: {
                role: function () {
                    return role;
                },
                loadDeps: ['DependenciesLoader', 'JS_REQUIRES', function(DependenciesLoader, JS_REQUIRES) {
                    return DependenciesLoader.load(
                        _.find(JS_REQUIRES.modules, function(item) {
                            return item.name == 'bootstrapSelect';
                        }),
                        'partials/editTeamRole/editTeamRoleCtrl.js?v=@@adminEditTeamRoleVersion'
                    );
                }]
            }
        });
    };
}]);

app.factory('$dialogContactUs', ['$uibModal', function ($uibModal) {
    return function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'partials/contactus/modal-contact-us.html?v=3',
            controller: 'ModalContactUsCtrl'
        });
    };
}]);

app.factory('$dialogThankYouVideo', ['$uibModal', function ($uibModal) {
    return function () {
        return $uibModal.open({
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'partials/thankyou-video/modal-video.html?v=3',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            controller: 'ModalVideoCtrl',
            windowTopClass: 'modal-video'
        });
    };
}]);


app.factory('$dialogMediaLibrary', ['$uibModal', function($uibModal) {
  return function(appendTo) {
    return $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'admin/mediaLib/modal-media-lib.html?v=@@modalMediaLibVersion',
      size: 'lg',
      controller: 'ModalMediaLibCtrl',
      controllerAs: 'mediaLibVM',
      appendTo: appendTo ? angular.element(document).find(appendTo) : undefined,
      resolve: {
        loadController: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load(['admin/mediaLib/mediaLibCtrl.js?v=@@mediaLibVersion', 'admin/mediaLib/modalMediaLibCtrl.js?v=@@modalMediaLibVersion'])
        }]
      }
    });
  };
}]);

app.factory('$dialogGetPromoCode', ['$uibModal', 'JS_REQUIRES', function ($uibModal, JS_REQUIRES) {
    return function () {
        return $uibModal.open({
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'referralPromo/getPromo/get-promo-modal.html?v=2',
            size: 'lg',
            controller: 'GetPromoCodesCtrl',
            controllerAs: 'promoCodeVM',
            windowTopClass: 'modal-subscription',
            resolve: {
                loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(JS_REQUIRES.scripts.GetPromoCodesCtrl);
                }]
            }
        });
    };
}]);

app.factory('$dialogReferralInstructions', ['$uibModal', function ($uibModal) {
    return function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'core/modal/referral-info-modal.html?v=@@referralInfoModalVersion',
            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                $scope.ok = function () {
                    $uibModalInstance.close();
                }
            }]
        });
    };
}]);

app.factory('$dialogHirePeople', ['$uibModal', function ($uibModal) {
    return function(customParams, dismissible) {
        if (dismissible === undefined) dismissible = true;
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'getstarted/leadInfoModal/lead-info-modal.html?v=@@leadInfoModalVersion',
            controller: 'LeadInfoModalCtrl',
            backdrop: dismissible ? true : 'static',
            keyboard: dismissible,
            resolve: {
                loadDeps: ['DependenciesLoader', 'JS_REQUIRES', function (DependenciesLoader, JS_REQUIRES) {
                    return DependenciesLoader.load(JS_REQUIRES.scripts.LeadInfoModalCtrl);
                }],
                customParams: function() {
                    return customParams;
                },
                dismissible: function() {
                    return dismissible;
                }
            }
        });
    };
}]);