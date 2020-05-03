'use strict'

app.factory('Quote', ['$http', 'API', 'ResponseValidator', 'CONST_COMMON', 
  function($http, API, ResponseValidator, CONST_COMMON) {
    function Quote(quoteData) {
      if (quoteData) {
        this.setData(quoteData);
      }
    };

    Quote.prototype = {
      setData: function(quoteData) {
        angular.extend(this, quoteData);
      },      
      load: function(referenceCode) {
        var scope = this;
        return $http.get(API.END_POINT + "/LeadContact/" + referenceCode).then(function(response) {
          if (ResponseValidator.isValid(response) && response.data.data.projectTeamReq) {
            scope.setData(response.data.data);
            return {success: true};
          } else if (ResponseValidator.isErrorResponseValid(response)) {
            return {success: false, errorMessage: response.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.LOAD_QUOTE_FAILED_MESSAGE};
          }
        }, function(errorResponse) {
          if (ResponseValidator.isErrorResponseValid(errorResponse)) {
            return {success: false, errorMessage: errorResponse.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.LOAD_QUOTE_FAILED_MESSAGE}; 
          }
        });
      },
      loadSummary: function(referenceCode) {
        var scope = this;
        return $http.get(API.END_POINT + "/QuoteSummary/" + referenceCode).then(function(response) {
          if (ResponseValidator.isValid(response)) {
            scope.summary = response.data.data;
            return {success: true};
          } else if (ResponseValidator.isErrorResponseValid(response)) {
            return {success: false, errorMessage: response.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.LOAD_QUOTE_FAILED_MESSAGE};
          }
        }, function(errorResponse) {
          if (ResponseValidator.isErrorResponseValid(errorResponse)) {
            return {success: false, errorMessage: response.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.LOAD_QUOTE_FAILED_MESSAGE};
          }
        });
      }
    };

    return Quote;
}]);