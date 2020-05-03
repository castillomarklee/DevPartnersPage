'use stict'

app.factory('MockRules', ['$q', function($q) {
  this.getList = function() {
    var deferred = $q.defer();
    setTimeout(function() {
      deferred.resolve({success: true, data: [
        {
          id: '1',
          name: 'admin',
          description: 'Admin'
        }, {
          id: '2',
          name: 'accountManager',
          description: 'Account Manager'
        }, {
          id: '3',
          name: 'editor',
          description: 'Editor'
        }
      ]});
    }, 1000);

    return deferred.promise;
  };

  return this;
}]);