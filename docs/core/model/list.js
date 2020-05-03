'use strict'

app.factory('List', [function() {
  function List(data) {
    if (data) {
      this.setData(data);
    }
  };

  List.prototype = {
    page: null,
    perPage: 20,
    size: 0,
    records: 0,
    items: null,
    setData: function(data) {
      angular.extend(this, data);
    },
    hasNext: function() {
      if (this.records > 0) {
        var lastPage = Math.floor(this.records / this.perPage);
        var lastPageSize = this.records % this.perPage;
        if (lastPageSize > 0) {
          lastPage++;
        }
        return this.page < lastPage;
      } 
      return false;
    },
    hasPrevious: function() {
      return page > 1;
    }
  };

  return List;
}]);