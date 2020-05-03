'use strict'

app.service('MockUserStatus', ['$q', function ($q) {
  this.getList = function () {
    var deferred = $q.defer();
    setTimeout(function() {
      deferred.resolve({
        success: true,
        data: [{
            id: '1',
            name: 'active',
            description: 'Active'
          }, {
            id: '2',
            name: 'inactive',
            description: 'Inactive'
          }
        ]
      });
    }, 1000);

    return deferred.promise;
  };

  return this;
}]);