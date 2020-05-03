'use strict'

app.factory('Admin', ['$http', '$sanitize', 'API', 'ResponseValidator', 'AuthService', 'CONST_AGENT', 'Error',
  function ($http, $sanitize, API, ResponseValidator, AuthService, CONST_AGENT, Error) {
  function Admin(data) {
    if (data) {
      this.setData(data);
    }
  }

  Admin.prototype = {
    setData: function(data) {
      angular.extend(this, data);
      this.active = this.status === 'active';
    },
    create: function() {
      var newAdmin = this;
      newAdmin.status = 'creating';
      newAdmin.firstName = $sanitize(newAdmin.firstName);
      newAdmin.lastName = $sanitize(newAdmin.lastName);
      newAdmin.email = $sanitize(newAdmin.email);
      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return $http.post(API.END_POINT + '/User/Admin', newAdmin).then(function(response) {
            if (ResponseValidator.isValid(response)) {
              newAdmin.status = 'created'; //maybe change to invited?
              newAdmin.id = response.data.data.userId;
              return {success: true};
            } else if (ResponseValidator.isErrorResponseValid(response)) {
              newAdmin.status = 'create failed';
              newAdmin.error = new Error({message: response.data.error.details});
              return {success: false, errorMessage: response.data.error.details};
            } else {
              newAdmin.status = 'create failed';
              newAdmin.error = new Error({ message: CONST_AGENT.CREATE_ADMIN_FAILED });
              return {success: false, errorMessage: CONST_AGENT.CREATE_ADMIN_FAILED};
            }
          }, function(errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
              newAdmin.status = 'create failed';
              newAdmin.error = new Error({ message: response.data.error.details });
              return { success: false, errorMessage: errorResponse.data.error.details };
            } else {
              newAdmin.status = 'create failed';
              newAdmin.error = new Error({ message: CONST_AGENT.CREATE_ADMIN_FAILED });
              return { success: false, errorMessage: CONST_AGENT.CREATE_ADMIN_FAILED };
            }
          });
        } else {
          newAdmin.status = 'create failed';
          newAdmin.error = new Error({ message: CONST_AGENT.CREATE_ADMIN_FAILED });
          return { success: false, errorMessage: CONST_AGENT.CREATE_ADMIN_FAILED };
        }
      });
    },
    isActive: function() {
      return this.status === 'active';
    },
    isDeletable: function() {
      return this.status === 'inactive';
    },
    load: function() {
      var _this = this;
      return $http.get(API.END_POINT + '/User', {params: {
        username: this.id, byId: true
      }}).then(function(response) {
        if (ResponseValidator.isValid(response)) {
          _this.setData(response.data.data);
          return {success: true};
        } else {
          return handleError(response, 'load');
        }
      }, function (errorResponse) {
        return handleError(errorResponse, 'load');
      });
    },
    updateStatus: function() {
      var _this = this;
      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return $http.post(API.END_POINT + '/user/updateStatus/' + _this.id, {
            ruleId: _this.rule, isActive: _this.status === 'active'
          }).then(function (response) {
            if (ResponseValidator.isValid(response)) {
              _this.error = null;
              return { success: true };
            } else {
              var result = handleError(response, 'updateStatus');
              _this.error = new Error({ message: result.errorMessage });
              return result;
            }
          }, function (errorResponse) {
            var result = handleError(errorResponse, 'updateStatus');
            _this.error = new Error({ message: result.errorMessage });
            return result;
          });
        } else {
          var result = handleError(errorResponse, 'updateStatus');
          _this.error = new Error({ message: result.errorMessage });
          return result;
        }
      });
    },
    delete: function() {
      var _this = this;
      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return $http.post(API.END_POINT + '/User/UserDelete', { email: _this.email }).then(function (response) {
            if (ResponseValidator.isValid(response)) {
              return { success: true };
            } else {
              return handleError(response, 'delete');
            }
          }, function (errorResponse) {
            return handleError(errorResponse, 'delete');
          });
        } else {
          return handleError(errorResponse, 'delete');
        }
      });
    },
    completeProfile: function () {
      var profile = this;
      profile.firstName = $sanitize(profile.firstName);
      profile.lastName = $sanitize(profile.lastName);
      profile.phoneNumber = $sanitize(profile.phoneNumber);
      profile.password = $sanitize(profile.password);
      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return $http.post(API.END_POINT + '/User/Admin/' + profile.id, profile).then(function (response) {
            if (ResponseValidator.isValid(response)) {
              return { success: true, data: response.data };
            } else {
              return handleError(response, 'completeProfile');
            }
          }, function (errorResponse) {
            return handleError(errorResponse, 'completeProfile');
          });
        } else {
          return handleError(errorResponse, 'completeProfile');
        }
      });
    }
  };

  var handleError = function(errorResponse, processType) {
    if (ResponseValidator.isErrorResponseValid(errorResponse)) {
      return { success: false, errorMessage: errorResponse.data.error.details};
    } else {
      return { success: false, errorMessage: getDefaultErrorMessage(processType)};
    }
  };
  var getDefaultErrorMessage = function(processType) {
    switch(processType) {
      case 'completeProfile':
        return CONST_AGENT.COMPLETE_PROFILE_FAILED;
      case 'delete':
        return CONST_AGENT.DELETE_ADMIN_FAILED;
      case 'load':
        return CONST_AGENT.LOAD_ADMIN_FAILED;
      case 'updateStatus':
        return CONST_AGENT.UPDATE_ADMIN_FAILED;
    }
  };

  return Admin;
}]);