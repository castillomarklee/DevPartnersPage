'use strict'

app.service('Toast', ['ngToast', function (ngToast) {
  this.showToast = function (success, message) {
    ngToast.create({
      className: success ? 'success' : 'warning',
      content: message,
      dismissOnTimeout: true,
      dismissButton: true,
      dismissOnClick: true,
      animation: 'fade',
      timeout: 5000
    });
  };
  return this;
}]);