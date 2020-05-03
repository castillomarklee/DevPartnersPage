'use strict';

angular.module('app').controller('HeadCtrl', ['Page', function(Page) {
    var vm = this;
    vm.Page = Page;
}]);