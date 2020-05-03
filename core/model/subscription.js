'use strict'

app.factory('Subscription', ['$http', '$sanitize', 'API', 'ResponseValidator', 'AuthService', 'CONST_SUBSCRIPTION',
  function($http, $sanitize, API, ResponseValidator, AuthService, CONST_SUBSCRIPTION) {
    function Subscription(subscriptionData) {
      if (subscriptionData) {
        this.setData(subscriptionData);
      }
    }

    Subscription.prototype = {
      setData: function(data) {
        angular.extend(this, data);
      },
      register: function() {
        if (this.email) this.email = $sanitize(this.email);
        var body = this;
        return AuthService.getAntiForgeryToken().then(function(response) {
          if (response.success) {
            return $http.post(API.END_POINT + '/NewsLetter', body).then(function(response) {
              if (ResponseValidator.isValid(response) || ResponseValidator.isSuccess(response)) {
                return {success: true};
              } else if (ResponseValidator.isErrorResponseValid(response)) {  
                return {success: false, errorMessage: response.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_SUBSCRIPTION.SUBSCRIBE_FAILED};    
              }
            }, function(errorResponse) {
              if (ResponseValidator.isErrorResponseValid(errorResponse)) {  
                return {success: false, errorMessage: errorResponse.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_SUBSCRIPTION.SUBSCRIBE_FAILED};    
              }
            });
          } else {
            return {success: false, errorMessage: CONST_SUBSCRIPTION.SUBSCRIBE_FAILED};
          }
        });        
      },
      unsubscribe: function() {
        if (this.guid) this.guid = $sanitize(this.guid);
        var body = this;
        return AuthService.getAntiForgeryToken().then(function(response) {
          if (response.success) {
            return $http.put(API.END_POINT + '/NewsLetter/Unsubscribe?NewsletterId=' + body.guid).then(function(response) {
              if (ResponseValidator.isValid(response) || ResponseValidator.isSuccess(response)) {
                return {success: true};
              } else if (ResponseValidator.isErrorResponseValid(response)) {
                return {success: false, errorMessage: response.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_SUBSCRIPTION.UNSUBSCRIBE_FAILED};
              }
            }, function(errorResponse) {
              if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_SUBSCRIPTION.UNSUBSCRIBE_FAILED};
              }
            });
          } else {
            return {success: false, errorMessage: CONST_SUBSCRIPTION.UNSUBSCRIBE_FAILED};
          }
        });
      }
    };

    return Subscription;
}]);