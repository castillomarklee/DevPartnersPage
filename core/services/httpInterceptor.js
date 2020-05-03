'use strict'

app.factory('HttpInterceptor', ['$state', '$q', 'STATES', function ($state, $q, STATES) {
  return {
    request: function (config) {
        return config || $q.when(config);
    },
    requestError: function(request){
        return $q.reject(request);
    },
    response: function (response) {
        return response || $q.when(response);
    },
    responseError: function(response) {
      if (response.status === 401) {
        $state.go(STATES.LOGIN);
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    }
  };
}]);