'use strict'

app.service('BlogCategories', ['$http', 'API', 'ResponseValidator', function ($http, API, ResponseValidator) {

  this.getList = function (filter) {
    return $http.get(API.END_POINT + '/post/category' + (filter ? '?IsActiveOnly=true' : '')).then(function (response) {
      if (ResponseValidator.isValid(response)) {
        return {
          success: true,
          data: response.data.data.category
        };
      } else {
        return handleGetListError(response, "Unable to get the list of subcategories.");
      }
    }, function (errorResponse) {
      return handleGetListError(errorResponse, "Unable to get the list of subcategories.");
    });
  };

  this.getSubcategories = function (categoryId, filter) {
    return $http.get(API.END_POINT + '/post/getAllSubCategory?id=' + categoryId  + (filter ? '&IsActiveOnly=true' : '')).then(function (response) {
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
    return $http.post(API.END_POINT + '/post/addUpdateCategory', data).then(function (response) {
      if (ResponseValidator.isValid(response)) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        return handleGetListError(response, "Unable to add category.");
      }
    }, function (errorResponse) {
      return handleGetListError(errorResponse, "Unable to update category.");
    });
  };

  this.update = function (data) {
    return $http.post(API.END_POINT + '/post/addUpdateCategory', data).then(function (response) {
      if (ResponseValidator.isValid(response)) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        return handleGetListError(response, "Unable to update category.");
      }
    }, function (errorResponse) {
      return handleGetListError(errorResponse, "Unable to update category.");
    });
  };

  this.delete = function (data) {
    return $http.delete(API.END_POINT + '/post/deleteCategory?id=' + data.id)
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