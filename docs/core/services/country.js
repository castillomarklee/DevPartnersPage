'use strict'

app.service('Country', ['$http', 'API', 'ResponseValidator', 'CONST_COMMON',
  function($http, API, ResponseValidator, CONST_COMMON) {
    return {
      getList: function() {
        return $http.get(API.END_POINT + "/country").then(function(response) {
          if (ResponseValidator.isValid(response) && response.data.data.country && response.data.data.country.length > 0) {
            return {success: true, data: response.data.data.country};
          } else if (ResponseValidator.isErrorResponseValid(response)) {
            return {success: false, errorMessage: response.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.GET_COUNTRIES_FAILED};
          }
        }, function(errorResponse) {
          if (ResponseValidator.isValid(errorResponse)) {
            return {success: false, errorMessage: errorResponse.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.GET_COUNTRIES_FAILED};
          }
        });
      },
      getCountry: function(id) {
        return $http.get(API.END_POINT + "/country/" + id).then(function(response) {
          if (ResponseValidator.isValid(response)) {
            return {success: true, data: response.data.data.country};
          } else if (ResponseValidator.isErrorResponseValid(response)) {
            return {success: false, errorMessage: response.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.GET_COUNTRIES_FAILED};
          }
        }, function(errorResponse) {
          if (ResponseValidator.isValid(errorResponse)) {
            return {success: false, errorMessage: errorResponse.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.GET_COUNTRIES_FAILED};
          }
        });
      }
    };
}]);