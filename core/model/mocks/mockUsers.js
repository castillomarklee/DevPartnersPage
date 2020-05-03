'use strict'

app.factory('MockUsers', ['$q', 'Users', 'Admin', function($q, Users, Admin) {

  function MockUsers(data) {
    if (data) {
      this.setData(data);
    }
  }
  angular.extend(MockUsers.prototype, Users.prototype);

  var list = [
    new Admin({
      firstName: 'Natalie',
      lastName: 'Froedstrom',
      rule: '1',
      ruleDescription: 'Admin',
      status: 'active',
      id: '1'
    }),
    new Admin({
      firstName: 'Robert',
      lastName: 'Kingsley',
      rule: '1',
      ruleDescription: 'Admin',
      status: 'active',
      id: '2'
    }),
    new Admin({
      firstName: 'Thane',
      lastName: 'Lastwill',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '3'
    }),
    new Admin({
      firstName: 'Athena',
      lastName: 'Bradwell',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '4'
    }),
    new Admin({
      firstName: 'Sigmond',
      lastName: 'Freed',
      rule: '1',
      ruleDescription: 'Admin',
      status: 'active',
      id: '5'
    }),
    new Admin({
      firstName: 'Reese',
      lastName: 'Witherfork',
      rule: '3',
      ruleDescription: 'Editor',
      status: 'active',
      id: '6'
    }),
    new Admin({
      firstName: 'Candice',
      lastName: 'Lithmus',
      rule: '3',
      ruleDescription: 'Editor',
      status: 'active',
      id: '7'
    }),
    new Admin({
      firstName: 'Theresa',
      lastName: 'Birmingham',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '8'
    }),
    {
      firstName: 'Grover',
      lastName: 'Uberwald',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '9'
    },
    {
      firstName: 'Crast',
      lastName: 'Bilford',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '10'
    },
    {
      firstName: 'Kruvard',
      lastName: 'Hellingswell',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '11'
    },
    {
      firstName: 'Fenris',
      lastName: 'Vulf',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '12'
    },
    {
      firstName: 'Rivas',
      lastName: 'Bushkani',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '13'
    },
    {
      firstName: 'Kirk',
      lastName: 'Flatlands',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '14'
    },
    {
      firstName: 'Felice',
      lastName: 'Maelstrom',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '15'
    },
    {
      firstName: 'Rickford',
      lastName: 'Santana',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '16'
    },
    {
      firstName: 'Henry',
      lastName: 'Stoneblast',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '17'
    },
    {
      firstName: 'Cinncinati',
      lastName: 'Kruxvaldt',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '18'
    },
    {
      firstName: 'Kreos',
      lastName: 'Filvidri',
      rule: '2',
      ruleDescription: 'Account Manager',
      status: 'active',
      id: '19'
    },
  ];

  this.perPage = 20;

  MockUsers.prototype.getListByPage = function(page) {
    var deferred = $q.defer();
    var _this = this;
    setTimeout(function() {
      var endIndexExclusive = _this.perPage * page;
      var startIndex = endIndexExclusive - _this.perPage;
      var items, records;
      if (_this.filters) {
        var filteredList = [];
        angular.forEach(list, function(value, key) {
          if (_this.filters.status && _this.filters.rule) {
            if (value.status === _this.filters.status && value.rule === _this.filters.rule) {
              filteredList.push(value);
            }
          } else if (_this.filters.status) {
            if (_this.filters.status === value.status) {
              filteredList.push(value);
            }
          } else if (_this.filters.rule) {
            if (_this.filters.rule === value.rule) {
              filteredList.push(value);
            }
          } else {
            filteredList.push(value);
          }
        });
        items = filteredList.slice(startIndex, endIndexExclusive);
        records = filteredList.length;
      } else {
        items = list.slice(startIndex, endIndexExclusive);
        records = list.length;
      }
      _this.setData({
        items: items,
        page: page,
        size: items ? items.length : 0,
        records: records
      });
      deferred.resolve({success: true});
    }, 2000);
    return deferred.promise;
  };

  MockUsers.prototype.delete = function(user) {
    var deferred = $q.defer();
    var userIndex = this.items.findIndex(function (data) {
      return data.id === user.id;
    });
    this.items.splice(userIndex, 1);
    this.records--;
    setTimeout(function() {
      var userIndexInList = list.findIndex(function(data) {
        return data.id === user.id;
      });
      list.splice(userIndexInList, 1);
      deferred.resolve({success: true});
    }, 1000);
    return deferred.promise;
  };

  return MockUsers;
}]);