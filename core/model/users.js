'use strict'

app.factory('Users', ['$http', 'API', 'ResponseValidator', 'List', 'Admin', function ($http, API, ResponseValidator, List, Admin) {
  function Users(data) {
    if (data) {
      this.setData(data);
    }
  }

  angular.extend(Users.prototype, List.prototype);

  var perPage = 20;
  var handleError = function(errorResponse) {
    if (ResponseValidator.isErrorResponseValid(errorResponse)) {
      return { success: false, errorMessage: errorResponse.data.error.details };
    } else {
      return { success: false, errorMessage: 'Unable to get the list of users. Please try again later or contact us.' };
    }
  };

  Users.prototype.filters = undefined;
  Users.prototype.setData = function(data) {
    if (data.items && data.items.length > 0) {
      for (var i = 0; i < data.items.length; i++) {
        data.items[i].status = this.filters.status;
        data.items[i] = new Admin(data.items[i]);
      }
    }
    angular.extend(this, data);
  };
  Users.prototype.getListByPage = function (page) {
    var _this = this;
    var params = {
      params: {
        role: 'admin',
        page: page,
        perPage: perPage
      }
    };
    if (_this.filters) {
      if (_this.filters.rule) {
        params.params.rule = _this.filters.rule;
      }
      if (_this.filters.status) {
        params.params.status = _this.filters.status;
      }
    }
    if (_this.sortBy) params.params.sortBy = _this.sortBy;
    if (_this.orderBy) params.params.orderBy = _this.orderBy;

    return $http.get(API.END_POINT + '/user/list', params).then(function(response) {
      if (ResponseValidator.isValid(response)) {
        _this.setData(response.data.data);
        return {success: true};
      } else {
        return handleError(response);
      }
    }, function(errorResponse) {
      return handleError(errorResponse);
    });
  };
  Users.prototype.setRuleFilter = function(filter) {
    if (!this.filters) this.filters = {};
    this.filters.rule = filter;
  };
  Users.prototype.setStatusFilter = function(filter) {
    if (!this.filters) this.filters = {};
    this.filters.status = filter;
  };
  Users.prototype.clearFilters = function() {
    this.filters = undefined;
  };
  Users.prototype.add = function(newUser, index) {
    if (!this.items) this.items = [];
    if (typeof index !== 'undefined' && index !== null) {
      this.items.splice(index, 0, newUser);
    } else {
      this.items.push(newUser);
    }
    return newUser.create();
  };
  Users.prototype.delete = function(user) {
    var userIndex = this.items.findIndex(function(data) {
      return data.id === user.id;
    });
    this.items.splice(userIndex, 1);
    this.records--;
    return user.delete();
  };

  return Users;
}]);