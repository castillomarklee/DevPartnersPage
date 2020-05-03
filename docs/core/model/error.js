'use strict'
app.factory('Error', [function() {
  function Error(errorData) {
    if (errorData) {
      this.setData(errorData);
    }
  };

  Error.prototype = {
    setData: function(errorData) {
      angular.extend(this, errorData);
    },
    clear: function() {
      this.setData({});
    },
    isClear: function() {
      return this.message === undefined || this.message === null || this.message === '';
    }
  };

  return Error;
}]);