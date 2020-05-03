'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngCookies',
  'ngResource',
  'oc.lazyLoad',
  'ngSanitize',
  'ngAnimate',
  'ngMessages',
  'ngFileUpload',
  'ngStorage',
  'ui.router',
  'ui.bootstrap',
  'ui.event',
  'duScroll',
  'vcRecaptcha',
  'angular-google-analytics',
  'angularSpinner',
  'cfp.loadingBar',
  'angular-clipboard',
  'slick'
]).value('duScrollOffset', 135)
  .value('duScrollGreedy', true)
  .constant('_', window._);
