'use strict';

app.factory('ContactUsService', [
  '$http',
  '$cookies',
  '$sanitize',
  'API',
  function($http, $cookies, $sanitize, API) {
    var service = {};
    service.send = function(message) {
      if (message) {
        message.fullName = $sanitize(message.fullName);
        message.email = $sanitize(message.email);
        message.phone = $sanitize(message.phone);
        message.message = $sanitize(message.message);
        message.sourceIPAddress = $sanitize(message.sourceIPAddress);
      }

      return $http.post(API.END_POINT + '/contactus', message).then(
        function(response) {
          if (response && response.data && response.data.status === 'Success') {
            return { success: true, message: 'Message sent!' };
          } else {
            return {
              success: false,
              message: 'Unable to send your message. Please try again later.'
            };
          }
        },
        function(response) {
          return {
            success: false,
            message: 'Unable to send your message. Please try again later.'
          };
        }
      );
    };

    return service;
  }
]);
