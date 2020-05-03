app.config([
  '$compileProvider',
  '$logProvider',
  '$filterProvider',
  '$controllerProvider',
  '$provide',
  '$localStorageProvider',
  '$sessionStorageProvider',
  'AnalyticsProvider',
  'cfpLoadingBarProvider',
  '$locationProvider',
  function(
    $compileProvider,
    $logProvider,
    $filterProvider,
    $controllerProvider,
    $provide,
    $localStorageProvider,
    $sessionStorageProvider,
    AnalyticsProvider,
    cfpLoadingBarProvider,
    $locationProvider
  ) {
    $compileProvider.debugInfoEnabled(false);
    $logProvider.debugEnabled(false);
    $locationProvider.html5Mode(true);
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    //Google Analytics Config
    AnalyticsProvider.setAccount('@@gAnalytics');
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.trackUrlParams(true);
    AnalyticsProvider.ignoreFirstPageLoad(true);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');
    AnalyticsProvider.setDomainName('none');

    $localStorageProvider.setKeyPrefix('dpcrm');
    $sessionStorageProvider.setKeyPrefix('dpcrm');

    cfpLoadingBarProvider.includeSpinner = false;
  }
]);

app.run([
  '$rootScope',
  '$state',
  '$stateParams',
  '$location',
  '$window',
  'AccountService',
  'Analytics',
  'STATES',
  'ANALYTICS',
  function(
    $rootScope,
    $state,
    $stateParams,
    $location,
    $window,
    AccountService,
    Analytics,
    STATES,
    ANALYTICS
  ) {
    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.STATES = STATES;
    $rootScope.ANALYTICS = ANALYTICS;

    $rootScope.app = {
      name: 'Dev Partners',
      author: 'Dev Partners',
      description: 'Your Remote Resources Partner',
      logo: 'assets/images/logo-gold.png?v=1'
    };

    AccountService.checkSession();

    String.prototype.splice = function(idx, rem, s) {
      return this.slice(0, idx) + s + this.slice(idx + Math.abs(rem));
    };
  }
]);
