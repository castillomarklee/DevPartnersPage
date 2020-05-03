'use strict'

app.service('Currency', ['$http', 'API', '$localStorage', 'ResponseValidator', 'CONST_COMMON', 'CONST_STORAGE',
 function($http, API, $localStorage, ResponseValidator, CONST_COMMON, CONST_STORAGE) {
  var service = this;
  this.getList = function() {
    return $http.get(API.END_POINT + '/Currency')
      .then(function(response) {
        if (ResponseValidator.isValid(response) && response.data.data.currency && response.data.data.currency.length > 0) {
          return {success: true, data: response.data.data.currency};
        } else if ($localStorage.currencies) {
          return {success: true, data: $localStorage.currencies};
        } else if (ResponseValidator.isErrorResponseValid(response)) {
          return {success: false, errorMessage: response.data.error.details};
        } else {
          return {success: false, errorMessage: CONST_COMMON.GET_CURRENCIES_FAILED};
        }
      }, function(errorResponse) {
        if ($localStorage.currencies) {
          return {success: true, data: $localStorage.currencies};
        } else if (ResponseValidator.isErrorResponseValid(errorResponse)) {
          return {success: false, errorMessage: errorResponse.data.error.details};
        } else {
          return {success: false, errorMessage: CONST_COMMON.GET_CURRENCIES_FAILED};
        }
      });
  };
}]);