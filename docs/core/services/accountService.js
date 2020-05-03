'use strict'

app.service('AccountService', ['$http', '$rootScope', '$q', '$log', '$sanitize', '$cookies', '$localStorage', '$sessionStorage', 'API', 'User', 'AuthService', 'ResponseValidator', 'CONST_STORAGE', 'CONST_AUTH', 'CONST_COMMON',
  function($http, $rootScope, $q, $log, $sanitize, $cookies, $localStorage, $sessionStorage, API, User, AuthService, ResponseValidator, CONST_STORAGE, CONST_AUTH, CONST_COMMON) {
  //todo: RASAP. conform to the best practices.
  var service = this;
  service.newUser;
  service.generateNewUser = function() {
    service.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      organizationName: '',
      state: '',
      loginProvider: {
        provider: null,
        accessToken: null
      }
    };
    return $q.when(service.newUser);
  };

  service.saveNewUser = function(user) {
    if (user) {
      user.firstName = $sanitize(user.firstName);
      user.lastName = $sanitize(user.lastName);
      user.email = $sanitize(user.email);
      user.phoneNumber = $sanitize(user.phoneNumber);
      user.organizationName = $sanitize(user.organizationName);
      user.state = $sanitize(user.state);
      user.password = $sanitize(user.password);
    }

    return AuthService.getAntiForgeryToken().then(function(response) {
      if (response.success) {
        return $http({
            method: 'POST',
            url: API.END_POINT + '/User',
            data: user
        }).then(function(response) {
            if (response && response.data && response.data.data) {
              $localStorage.account = response.data;
              return {success: true, data: response.data};
            } else if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, errorMessage: response.data.error.details};
            } else {
              return {success: false, errorMessage: "Oops! Something went wrong."};
            }
          }, function(reject) {
            $log.error(reject);
            if (ResponseValidator.isErrorResponseValid(reject)) {
              return {success: false, errorMessage: reject.data.error.details};
            } else {
              return {success: false, errorMessage: "Oops! Something went wrong."};
            }
          });
      } else {
        return {success: false, errorMessage: response.message};
      }
    });
  };

  service.getSavedUser = function() {
    return $localStorage.account;
  };

  service.verifyAccount = function(verification) {
    return $http.post(API.END_POINT + "/User/ConfirmEmail", verification)
      .then(function(response) {
        if (response.data.status === 'Success') {
          return {success: true};
        } else if (ResponseValidator.isErrorResponseValid(response)) {
          return {success: false, errorMessage: response.data.error.details};
        } else {
          return {success: false, errorMessage: CONST_AUTH.EMAIL_VERIFICATION_FAILED};
        }
      }, function(response) {
        if (ResponseValidator.isErrorResponseValid(response)) {
          return {success: false, errorMessage: response.data.error.details};
        } else {
          return {success: false, errorMessage: CONST_AUTH.EMAIL_VERIFICATION_FAILED};
        }
      });
  };

  service.restorePassword = function(email) {
    return AuthService.getAntiForgeryToken().then(function(antiforgeryResponse) {
      if (antiforgeryResponse.success) {
        return $http.post(API.END_POINT + "/User/ForgotPassword", email)
          .then(function(response) {
            if (response && response.data && response.data.status === 'Success') {
              return {success: true};
            } else if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, errorMessage: response.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
            }
          }, function(response) {
            if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, errorMessage: response.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
            }
          });
      } else {
        return {success: false, errorMessage: antiforgeryResponse.message};
      }
    });
  };

  service.resetPassword = function(passwordReset) {
    return AuthService.getAntiForgeryToken().then(function(antiforgeryResponse) {
      if (antiforgeryResponse) {
        return $http.post(API.END_POINT + "/User/ResetPassword", passwordReset)
          .then(function(response) {
            if (response && response.data && response.data.data) {
              $localStorage.user = response.data;
              $rootScope.currentUser = new User();
              $rootScope.currentUser.setData(response.data);
              return {success: true};
            } else if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, errorMessage: response.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
            }
          }, function(response) {
            if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, errorMessage: response.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
            }
          });
      } else {
        return {success: false, errorMessage: antiforgeryResponse.message};
      }
    });
  };

  service.changePassword = function(changePassword) {
    return AuthService.getAntiForgeryToken().then(function(antiforgeryResponse) {
      if (antiforgeryResponse) {
        return $http.post(API.END_POINT + "/User/ChangePassword", changePassword)
          .then(function(response) {
            //todo: changePassword
          }, function(response) {
            if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, errorMessage: response.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
            }
          });
      } else {
        return {success: false, errorMessage: antiforgeryResponse.message};
      }
    });
  };

  service.checkSession = function() {
    if ($localStorage.user && $localStorage.user.data && $localStorage.user.link) {
      $rootScope.currentUser = new User();
      $rootScope.currentUser.setData($localStorage.user);
    } else {
      $rootScope.currentUser = null;
    }
  };

  service.login = function(credentials, remember) {
    credentials.email = $sanitize(credentials.email);
    credentials.password = $sanitize(credentials.password);
    return AuthService.getAntiForgeryToken().then(function(antiforgeryResponse) {
      if (antiforgeryResponse.success) {
        credentials.rememberMe = remember;
        return $http.post(API.END_POINT + "/login", credentials)
          .then(function(response) {
            if (response && response.data && response.data.data) {
              service.setCurrentUser(response.data, remember);
              return {success: true, user: response.data.data};
            } else {
              return {success: false, errorMessage: CONST_AUTH.ERROR_LOGIN};
            }
          }, function(response) {
            if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, userUnverified: response.data.error.title === 'Email Unverified', hasMissingFields: response.data.error.errorCode === 'missing_fields', errorMessage: response.data.error.details};
            } else if(response && response.data && response.data.details){
              return {success: false, userUnverified: response.data.title === 'Email Unverified', errorMessage: response.data.details};
            } else {
              return {success: false, errorMessage: CONST_AUTH.ERROR_LOGIN};
            }
          });
      } else {
        return {success: false, userUnverified: false, errorMessage: CONST_AUTH.ERROR_LOGIN};
      }
    });
  };

  service.clearSession = function() {
    $cookies.remove('.AspNetCore.Identity.Application');
    delete $localStorage.user;
    $rootScope.currentUser = null;
  };

  service.logout = function () {
    service.clearSession();
    return $http.delete(API.END_POINT + "/logout").then(function(response) {
      if (ResponseValidator.isValid(response) && response.status === 200) {
        return {success: true};
      } else if (ResponseValidator.isErrorResponseValid(response)) {
        $log.debug(response.data.error.details);
        return {success: true};
      } else {
        $log.debug(CONST_AUTH.ERROR_LOGOUT);
        return {success: true};
      }
    }, function(errorResponse) {
      if (ResponseValidator.isErrorResponseValid(errorResponse)) {
        $log.debug(errorResponse.data.error.details);
        return {success: true};
      } else {
        $log.debug(CONST_AUTH.ERROR_LOGOUT);
        return {success: true};
      }
    });
  };

  service.getFacebookProfile = function(token) {
    return $http.get('https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=' + token).then(function(response) {
      return {success: true, data: response.data};
    }, function(errorRespons) {
      return {success: false, errorMessage: 'Unable to authenticate with Facebook.'};
    });
  };

  service.setCurrentUser = function(user, remember) {
    $rootScope.currentUser = new User();
    $rootScope.currentUser.setData(user);
    $localStorage.user = user;
    $localStorage.rememberUser = remember;
  };

}]);