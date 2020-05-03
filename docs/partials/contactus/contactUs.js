angular.module('app').controller('ContactUsCtrl', [
  '$scope',
  '$rootScope',
  '$dialogAlert',
  '$state',
  'AuthService',
  'ContactUsService',
  'vcRecaptchaService',
  'CONST_COMMON',
  'SPINNER_CONFIGS',
  '$location',
  'GetStartedService',
  function(
    $scope,
    $rootScope,
    $dialogAlert,
    $state,
    AuthService,
    ContactUsService,
    vcRecaptchaService,
    CONST_COMMON,
    SPINNER_CONFIGS,
    $location,
    GetStartedService
  ) {
    GetStartedService.getIP().then(function(response) {
      $scope.contactDetails.sourceIPAddress = response;
    });
    $scope.contactDetails = {
      fullName: null,
      email: null,
      phone: null,
      message: null
    };

    $scope.submitting = false;
    $scope.btnSendText = CONST_COMMON.SEND;
    $scope.recaptchaKey = CONST_COMMON.RECAPTCHA_KEY;
    $scope.spinnerSM = SPINNER_CONFIGS.spinnerSM;

    if (angular.isUndefined($scope.btnClass)) $scope.btnClass = 'btn-outline';

    var isLoggedIn = function() {
      return $rootScope.currentUser && $rootScope.currentUser.isLoggedIn;
    };

    var resetOnSuccess = function(success) {
      $scope.submitting = false;
      $scope.btnSendText = CONST_COMMON.SEND;

      if (success) {
        $scope.contactDetails = {};
        $scope.contactUsForm.$setPristine();
        $scope.contactUsForm.$setUntouched();
      }
    };

    $scope.init = function() {
      if (isLoggedIn()) {
        $scope.contactDetails.fullName =
          $rootScope.currentUser.firstName +
          ' ' +
          $rootScope.currentUser.lastName;
        $scope.contactDetails.email = $rootScope.currentUser.email;
        $scope.contactDetails.phone = $rootScope.currentUser.phoneNumber;
      }
    };

    $scope.setCaptchaWidgetId = function(widgetId) {
      $scope.captchaWidgetId = widgetId;
    };

    $scope.submit = function(isValid) {
      if (isValid) {
        $scope.submitting = true;
        $scope.btnSendText = CONST_COMMON.SENDING;

        if (vcRecaptchaService.getResponse($scope.captchaWidgetId) !== '') {
          AuthService.getAntiForgeryToken().then(function(response) {
            if (response.success) {
              $scope.contactDetails[
                'g-recaptcha-response'
              ] = vcRecaptchaService.getResponse($scope.captchaWidgetId);
              ContactUsService.send($scope.contactDetails).then(function(
                response
              ) {
                vcRecaptchaService.reload($scope.captchaWidgetId);
                if (response.success) {
                  resetOnSuccess(response.success);
                  $scope.onSuccess();
                  $location.path('/message');
                } else {
                  handleError(response);
                }
              });
            } else {
              if (response.message) {
                handleError(response);
              } else {
                $scope.onError();
                $dialogAlert(
                  CONST_COMMON.GENERIC_ERROR_TITLE,
                  'We were unable to send your message. Please try again later.'
                );
              }
              vcRecaptchaService.reload($scope.captchaWidgetId);
            }
          });
        } else {
          $dialogAlert(
            CONST_COMMON.GENERIC_ERROR_TITLE,
            CONST_COMMON.RESOLVE_CAPTCHA
          );
        }
      }
    };

    var handleError = function(errorResponse) {
      resetOnSuccess(errorResponse.success);
      if ($scope.onError) {
        $scope.onError(errorResponse);
      } else {
        $dialogAlert(
          CONST_COMMON.GENERIC_ERROR_TITLE,
          CONST_COMMON.MESSAGE_FAILED
        );
      }
    };
  }
]);

angular.module('app').controller('ModalContactUsCtrl', [
  '$scope',
  '$state',
  '$uibModalInstance',
  '$dialogAlert',
  'CONST_COMMON',
  function($scope, $state, $uibModalInstance, $dialogAlert, CONST_COMMON) {
    $scope.title = CONST_COMMON.CONTACT_US_TITLE;
    $scope.close = function() {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.onError = function(error) {
      $uibModalInstance.close();
      $dialogAlert(
        CONST_COMMON.GENERIC_ERROR_TITLE,
        CONST_COMMON.MESSAGE_FAILED
      );
    };
  }
]);

app.directive('contactUs', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/contactus/contact-us.html?v=@@contactUsVersion',
    scope: {
      showTitle: '=',
      modal: '=',
      btnClass: '@',
      onSuccess: '&',
      onError: '&'
    },
    controller: 'ContactUsCtrl'
  };
});
