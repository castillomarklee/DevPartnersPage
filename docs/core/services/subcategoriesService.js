'use strict'

app.service('BlogSubcategories', ['$http', 'API', 'ResponseValidator', function ($http, API, ResponseValidator) {

  this.get = function () {
    return $http.get(API.END_POINT + '/post/getallsubcategory').then(function (response) {
      if (ResponseValidator.isValid(response)) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        return handleGetListError(response, "Unable to get the list of subcategories.");
      }
    }, function (errorResponse) {
      return handleGetListError(errorResponse, "Unable to get the list of subcategories.");
    });
  };

  this.add = function (data) {
    return $http.post(API.END_POINT + '/post/addupdatesubcategory', data).then(function (response) {
      if (ResponseValidator.isValid(response)) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        return handleGetListError(response, "Unable to add subcategory.");
      }
    }, function (errorResponse) {
      return handleGetListError(errorResponse, "Unable to add subcategory.");
    });
  };

  this.update = function (data) {
    return $http.post(API.END_POINT + '/post/addupdatesubcategory', data).then(function (response) {
      if (ResponseValidator.isValid(response)) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        return handleGetListError(response, "Unable to update subcategory.");
      }
    }, function (errorResponse) {
      return handleGetListError(errorResponse, "Unable to update subcategory.");
    });
  };

  this.delete = function (data) {
    return $http.delete(API.END_POINT + '/post/deletesubcategory?id='+data.id)
      .then(function (response) {
        if (ResponseValidator.isValid(response)) {
          return {
            success: true,
            data: response.data.data
          };
        } else {
          return handleGetListError(response, "Unable to delete subcategory.");
        }
      }, function (errorResponse) {
        return handleGetListError(errorResponse, "Unable to delete subcategory.");
      });
  };

  var handleGetListError = function (errorResponse, errorMessage) {
    if (ResponseValidator.isErrorResponseValid(errorResponse)) {
      return {
        success: false,
        errorMessage: errorResponse.data.error.details
      };
    } else {
      return {
        success: false,
        errorMessage: errorMessage
      };
    }
  };
}]);