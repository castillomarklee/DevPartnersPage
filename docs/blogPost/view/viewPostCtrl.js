'use strict'

angular.module('app').controller('ViewPostCtrl', [
  '$stateParams',
  '$sce',
  '$location',
  'BlogEntry',
  'Page', function ($stateParams, $sce, $location, BlogEntry, Page) {
  var vm = this;
  vm.entry = new BlogEntry({ id: $stateParams.postId });
  init();

  function init() {
    vm.isLoadingContent = true;
    vm.entry.loadFromConstant().then(function(response) {
      if (response.success) {
        vm.isLoadingContent = false;
      } else {
        vm.entry.load().then(function(response) {
          vm.isLoadingContent = false;
          if (response.success) {
            Page.title = vm.entry.title;
            Page.description = vm.entry.subTitle;
            if (!vm.entry.datePublished.endsWith('+00:00')) vm.entry.datePublished += '+00:00';
          }
        });
      }
    });
  }

  vm.toggleLike = function() {
    if (vm.entry.liked) vm.entry.unlike();
    else vm.entry.like();
  };
}]);