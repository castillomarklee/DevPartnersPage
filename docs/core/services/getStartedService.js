'use strict';

app.service('GetStartedService', [
  '$http',
  'API',
  'AuthService',
  '$sanitize',
  function($http, API, AuthService, $sanitize) {
    var service = this;

    service.getSkillSet = function() {
      return $http.get(API.END_POINT + '/Project/GetProjectSkillSets').then(
        function(response) {
          if (response && response.data.data) {
            return {
              success: true,
              data: response.data.data
            };
          } else {
            return {
              success: false,
              message: 'Unable to get skill set.'
            };
          }
        },
        function(errorResponse) {
          return {
            success: false,
            message: 'Unable to get skill set.'
          };
        }
      );
    };

    service.uploadFile = function(data) {
      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return $http.post(API.END_POINT + '/Document/upload', data).then(
            function(response) {
              if (response && response.data) {
                return {
                  success: true,
                  data: response.data.data
                };
              } else {
                return {
                  success: false,
                  message: 'Unable to upload.'
                };
              }
            },
            function(errorResponse) {
              return {
                success: false,
                message: 'Unable to upload file.'
              };
            }
          );
        }
      });
    };

    service.saveLead = function(data) {
      if (data) {
        _.each(data, function(value, key) {
          data[key] = $sanitize(value);
        });
      }
      //   console.log(data, 'saveLead');

      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return $http
            .post(API.END_POINT + '/LeadContact/LeadContactsNew', data)
            .then(
              function(response) {
                if (response && response.data) {
                  return {
                    success: true,
                    data: response.data.data
                  };
                } else {
                  return {
                    success: false,
                    message: 'Unable to save customer information.'
                  };
                }
              },
              function(errorResponse) {
                return {
                  success: false,
                  message: 'Unable to save customer information.'
                };
              }
            );
        }
      });
    };

    service.saveProjectDetails = function(data) {
      if (data) {
        _.each(data, function(value, key) {
          if (key != 'IsNeedRemoteSource') data[key] = $sanitize(value);
        });
      }

      return AuthService.getAntiForgeryToken().then(function(response) {
        if (response.success) {
          return $http
            .post(API.END_POINT + '/Project/NewProjectDescription', data)
            .then(
              function(response) {
                if (response && response.data) {
                  return {
                    success: true,
                    data: response.data.data
                  };
                } else {
                  return {
                    success: false,
                    message: 'Unable to save project description.'
                  };
                }
              },
              function(errorResponse) {
                return {
                  success: false,
                  message: 'Unable to save project description.'
                };
              }
            );
        }
      });
    };

    service.getIP = function() {
      return $http.get('https://jsonip.com').then(function(response) {
        return response.data.ip;
      });
    };

    return service;
  }
]);
