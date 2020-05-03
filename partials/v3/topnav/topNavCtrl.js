'use strict'

angular.module('app').controller('NavCtrl', ['$rootScope', '$scope', '$log', '$state', '$dialogContactUs', '$dialogConfirm', 'AccountService', 'CONST_AUTH', 'CONTACT_INFO', 'CLAIMS',
  function ($rootScope, $scope, $log, $state, $dialogContactUs, $dialogConfirm, AccountService, CONST_AUTH, CONTACT_INFO, CLAIMS) {
  var vm = this;
  vm.modal = false;
  vm.loggingOut = false;
  vm.contactNumber = CONTACT_INFO.DVO_NUM;
  vm.emailAddr = CONTACT_INFO.EMAIL_ADDR;
  var sidebarInitialized = false;
  vm.isHomePage = $state.current.name === $rootScope.STATES.HOME;
  $rootScope.hideNavMenus = false;
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    vm.modal = toState.name !== $rootScope.STATES.HOME;
    vm.isHomePage = toState.name === $rootScope.STATES.HOME;
    vm.logo = toState.data ? toState.data.logo : 'light';
  });

  console.log('this controller is called');

  vm.initSidebar = function() {
    if (sidebarInitialized) return;
    $log.debug('initSidebar: ' + sidebarInitialized);
    if (vm.isLoggedIn()) {
      var pushLeftBtn = document.querySelector('#c-button--push-left');
      if (pushLeftBtn) {
        var pushLeft = new Menu({
          wrapper: '#o-wrapper',
          type: 'push-left',
          maskId: '#c-mask'
        });
        pushLeftBtn.addEventListener('click', function(e) {
          e.preventDefault();
          pushLeft.open();
        });
        sidebarInitialized = true;
      }
    } else {
      var pushRightBtn = document.querySelector('#c-button--push-right');
      if (pushRightBtn) {
        var pushRight = new Menu({
          wrapper: '#o-wrapper',
          type: 'push-right',
          menuOpenerClass: '.c-button',
          maskId: '#c-mask'
        });
        pushRightBtn.addEventListener('click', function(e) {
          e.preventDefault;
          pushRight.open();
        });
        sidebarInitialized = true;
      }
    }
  };

  vm.openModalContactUs = function() {
    $dialogContactUs();
  };

  vm.isLoggedIn = function() {
    return $rootScope.currentUser && $rootScope.currentUser.isLoggedIn;
  };
  vm.isLoggedInAsClient = function() {
    return vm.isLoggedIn() && $rootScope.currentUser.isClient();
  };
  vm.isLoggedInAsAdmin = function () {
    return vm.isLoggedIn() && $rootScope.currentUser.isAdmin();
  };
  vm.canAccessUsers = function() {
    var canAccess = vm.isLoggedInAsAdmin() && $rootScope.currentUser.hasClaim(CLAIMS.ADMIN_VIEW_LIST);
    return canAccess;
  };
  vm.canAccessCMS = function() {
    return vm.isLoggedInAsAdmin() && $rootScope.currentUser.hasClaim(CLAIMS.MANAGE_BLOG);
  };
  vm.canAccessReferrals = function() {
    return vm.isLoggedInAsAdmin() && $rootScope.currentUser.hasClaim(CLAIMS.MANAGE_REFERRALS);
  };

  vm.logout = function() {
    $dialogConfirm(CONST_AUTH.LOGOUT_CONFIRMATION_TITLE, CONST_AUTH.LOGOUT_CONFIRMATION_MESSAGE).then(function(response) {
      if (response) {
        vm.loggingOut = true;
        AccountService.logout().then(function(response) {
          vm.loggingOut = false;
        });
        $state.go($scope.STATES.HOME);
      }
    });
  };

  vm.setSidebarMenuObserver = function(position) {
    $log.debug('setSidebarMenuObserver: ' + position);
    var sidebarMenu;
    switch(position) {
      case 'left':
        sidebarMenu = document.querySelector('#c-menu--push-left');
        break;
      case 'right':
        sidebarMenu = document.querySelector('#c-menu--push-right');
        break;
    }

    if (sidebarMenu) {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'class') $(".contact-links").toggleClass('hidden', $(".c-menu").hasClass("is-active"));
        });
      });
      var config = {attributes: true, childList: false, characterData: false, attributeFilter: ['class']};
      observer.observe(sidebarMenu, config);
    }
  };

  vm.onRequestAQuoteClick = function() {
    $state.go(vm.isLoggedIn() ? $rootScope.STATES.APP_REQUEST_QUOTE : $rootScope.STATES.GET_STARTED);
  };

  vm.isMenuItemActive = function(state) {
    return $state.current.name === state || $state.current.name.startsWith(state + '.');
  };
}]);