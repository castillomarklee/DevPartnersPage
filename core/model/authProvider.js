'use strict'

app.factory('AuthProvider', [function() {
  function AuthProvider(providerData) {
    if (providerData) {
      this.setData(providerData);
    } else {
      this.setData({provider: null, accessToken: null});
    }
  }

  AuthProvider.prototype = {
    setData: function(providerData) {
      angular.extend(this, providerData);
    }
  }

  return AuthProvider;
}]);