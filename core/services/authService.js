'use strict'

app.factory('AuthService', ['$rootScope', '$log', '$http', '$q', 'API', 'G_AUTH_API', 'ResponseValidator',
  function ($rootScope, $log, $http, $q, API, G_AUTH_API, ResponseValidator) {

  var service = {};

  service.getAntiForgeryToken = function() {
    return $http.get(API.END_POINT + "/AntiForgeryToken")
      .then(function(response) {
        if (response && response.data && response.data.antiforgerytoken) {
          $http.defaults.headers.common['X-XSRF-TOKEN'] = response.data.antiforgerytoken.token;
          return {success: true};
        } else {
          return {success: false};
        }
      }, function(response) {
        if (ResponseValidator.isErrorResponseValid(response)) {
          return {success: false, message: response.data.error.details};
        } else {
          return {success: false, message: "Unable to process your request at the moment."};
        }
      });
  };

  service.getGoogleAuthToken = function(scope) {
    var config = {
      'client_id': G_AUTH_API.web.client_id,
      'scope': scope
    };
    var deferred = $q.defer();
    gapi.auth.authorize(config, function () {
      deferred.resolve({success: true, data: gapi.auth.getToken()});
    });
    return deferred.promise;
  };

  return service;

}]);