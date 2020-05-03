'use strict'

app.factory('User', ['$http', '$log', '$sanitize', '$location', 'API', 'ResponseValidator', 'FileService', 'AuthService', 'CONST_USER', 'CLAIMS',
  function ($http, $log, $sanitize, $location, API, ResponseValidator, FileService, AuthService, CONST_USER, CLAIMS) {
  function User(userData) {
    if (userData) {
      this.setData(userData);
    }
  }

  User.prototype = {
    setData: function(userData) {
      if (userData) {
        if (userData.data) {
          angular.extend(this, userData.data);
          this.isLoggedIn = true;
          if (this.avatarPath && this.avatarPath !== '') {
            this.avatar = API.HOST + CONST_USER.AVATAR_PATH + userData.data.avatarPath;
          }
          if (userData.details) {
            this.id = userData.details.userId;
            this.organizationName = userData.details.organizationName;
            this.countryId = userData.details.countryId;
            this.state = userData.details.state;
            this.roleName = userData.details.roleName;
            this.ruleCode = userData.details.ruleCode;
            this.ruleName = userData.details.ruleName;
            this.setClaims();
          }
        } else {
          angular.extend(this, userData);
        }
      } else {
        this.reset();
      }
    },
    reset: function() {
      this.isLoggedIn = false;
      this.userName = '';
      this.userlink = '';
    },
    load: function() {
      var user = this;
      return $http.get(API.END_POINT + '/user', {params: {userName: user.userName}}).then(function(response) {
        if (ResponseValidator.isValid(response)) {
          user.setData(response.data);
          return {success: true};
        } else if (ResponseValidator.isErrorResponseValid(response)) {
          return {success: false, errorMessage: response.data.error.details};
        } else {
          return {success: false, errorMessage: CONST_USER.LOAD_USER_FAILED};
        }
      }, function(errorResponse) {
        if (ResponseValidator.isErrorResponseValid(errorResponse)) {
          return {success: false, errorMessage: errorResponse.data.error.details};
        } else {
          return {success: false, errorMessage: CONST_USER.LOAD_USER_FAILED};
        }
      });
    },
    update: function() {
      var user = this;
      user.firstName = $sanitize(user.firstName);
      user.lastName = $sanitize(user.lastName);
      user.phoneNumber = $sanitize(user.phoneNumber);
      user.organizationName = $sanitize(user.organizationName);
      user.state = $sanitize(user.state);
      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return $http.put(API.END_POINT + '/user/' + user.userName, user).then(function(response) {
            if (response && response.status === 200) {
              return {success: true};
            } else if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, errorMessage: response.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_USER.UPDATE_USER_FAILED};
            }
          }, function(errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
              return {success: false, errorMessage: errorResponse.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_USER.UPDATE_USER_FAILED};
            }
          });
        } else {
          return {success: false, errorMessage: CONST_USER.UPDATE_USER_FAILED};
        }
      });
    },
    updateAvatar: function(url, filename) {
      var avatar = FileService.getFileAsBlob(url, filename);
      var user = this;
      $log.debug('file size: ' + avatar.size);
      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return FileService.uploadProfilePicture(avatar).then(function(response) {
            if (ResponseValidator.isValid(response)) {
              user.avatar = API.HOST + CONST_USER.AVATAR_PATH + response.data.data.avatarPath;
              return {success: true};
            } else if (ResponseValidator.isErrorResponseValid(response)) {
              return {success: false, errorMessage: response.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_USER.UPDATE_AVATAR_FAILED};
            }
          }, function(errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
              return {success: false, errorMessage: errorResponse.data.error.details};
            } else {
              return {success: false, errorMessage: CONST_USER.UPDATE_AVATAR_FAILED};
            }
          });
        } else {
          return {success: false, errorMessage: CONST_USER.UPDATE_AVATAR_FAILED};
        }
      });
    },
    isClient: function() {
      return this.roleName && this.roleName.toLowerCase() === 'client';
    },
    isAdmin: function() {
      return this.roleName && this.roleName.toLowerCase() === 'admin';
    },
    hasClaim: function(claim) {
      return this.claims.indexOf(CLAIMS.ALL) !== -1 || this.claims.indexOf(claim) !== -1;
    },
    setClaims: function () {
      this.claims = [];
      if (this.isAdmin()) {
        switch (this.ruleCode) {
          case 'superAdmin':
            this.claims = [CLAIMS.ALL];
            break;
          case 'admin':
            this.claims = [CLAIMS.ADMIN_VIEW_LIST, CLAIMS.ADMIN_VIEW, CLAIMS.ADMIN_CREATE_NEW, CLAIMS.CRM, CLAIMS.MANAGE_BLOG];
            break;
          case 'accountManager':
            this.claims = [CLAIMS.CRM, CLAIMS.MANAGE_BLOG];
            break;
          case 'editor':
            this.claims = [CLAIMS.MANAGE_BLOG];
            break;
        }
      }
    }
  };

  return User;
}]);