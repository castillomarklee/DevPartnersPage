"use strict";
angular.module("app").controller("HomeCtrl", [
  "$scope",
  "$log",
  "$sce",
  "$location",
  "$window",
  "$uibModal",
  "$dialogAlert",
  "MAPS_KEY",
  "DevPartnersTeam",
  "$timeout",
  "DevPartnersFeaturedTalents",
  "CONST_COMMON",
  "AuthService",
  "ContactUsService",
  "vcRecaptchaService",
  "SPINNER_CONFIGS",
  "GetStartedService",
  function (
    $scope,
    $log,
    $sce,
    $location,
    $window,
    $uibModal,
    $dialogAlert,
    MAPS_KEY,
    DevPartnersTeam,
    $timeout,
    DevPartnersFeaturedTalents,
    CONST_COMMON,
    AuthService,
    ContactUsService,
    vcRecaptchaService,
    SPINNER_CONFIGS,
    GetStartedService
  ) {
    var vm = this;
    (vm.talentList = DevPartnersFeaturedTalents.getList()),
      (vm.activeMap = 0),
      (vm.activeMapName = "ph.jpg"),
      (vm.locationTabs = [0, 1]),
      (vm.getMapBG = function (i, i2) {
        $timeout(function () {
          vm.activeMapName = i ? "sg.jpg" : "ph.jpg";
        }, 5);
      }),
      (vm.breakpoints = {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
        autoplay: !0,
        autoplaySpeed: 2e3,
      }),
      (vm.technologies = [
        { link: "assets/img/platforms/asp2.png" },
        { link: "assets/img/platforms/sql.png" },
        { link: "assets/img/platforms/laravel.png" },
        { link: "assets/img/platforms/php.png" },
        { link: "assets/img/platforms/mysql.png" },
        { link: "assets/img/platforms/html5.png" },
        { link: "assets/img/platforms/css3.png" },
        { link: "assets/img/platforms/ruby.png" },
        { link: "assets/img/platforms/angularjs.png" },
        { link: "assets/img/platforms/angular.png" },
        { link: "assets/img/platforms/react.png" },
        { link: "assets/img/platforms/python.png" },
        { link: "assets/img/platforms/django.png" },
        { link: "assets/img/platforms/ios.png" },
        { link: "assets/img/platforms/android.png" },
        { link: "assets/img/platforms/xamarin.png" },
        { link: "assets/img/platforms/github.png" },
        { link: "assets/img/platforms/svn.png" },
        { link: "assets/img/platforms/aws.png" },
        { link: "assets/img/platforms/azure.png" },
      ]),
      (vm.offices = DevPartnersTeam.getOffices()),
      (vm.gotoProcess = function () {
        $location.path("/process");
      }),
      GetStartedService.getIP().then(function (response) {
        vm.contactDetails.sourceIPAddress = response;
      }),
      (vm.contactDetails = {
        fullName: null,
        email: null,
        phone: null,
        message: null,
      }),
      (vm.submitting = !1),
      (vm.btnSendText = CONST_COMMON.SEND),
      (vm.recaptchaKey = CONST_COMMON.RECAPTCHA_KEY),
      (vm.setCaptchaWidgetId = function (widgetId) {
        vm.captchaWidgetId = widgetId;
      });
    var resetOnSuccess = function (success) {
      (vm.submitting = !1),
        (vm.btnSendText = CONST_COMMON.SEND),
        success && (vm.contactDetails = {});
    };
    vm.submit = function (isValid) {
      isValid &&
        ((vm.submitting = !0),
        (vm.btnSendText = "") !==
        vcRecaptchaService.getResponse(vm.captchaWidgetId)
          ? AuthService.getAntiForgeryToken().then(function (response) {
              response.success
                ? ((vm.contactDetails[
                    "g-recaptcha-response"
                  ] = vcRecaptchaService.getResponse(vm.captchaWidgetId)),
                  ContactUsService.send(vm.contactDetails).then(function (
                    response
                  ) {
                    vcRecaptchaService.reload(vm.captchaWidgetId),
                      response.success
                        ? ($location.path("/message"),
                          resetOnSuccess(response.success))
                        : handleError(response);
                  }))
                : (response.message
                    ? handleError(response)
                    : (vm.onError(),
                      $dialogAlert(
                        CONST_COMMON.GENERIC_ERROR_TITLE,
                        "We were unable to send your message. Please try again later."
                      )),
                  vcRecaptchaService.reload(vm.captchaWidgetId));
            })
          : $dialogAlert(
              CONST_COMMON.GENERIC_ERROR_TITLE,
              CONST_COMMON.RESOLVE_CAPTCHA
            ));
    };
    var handleError = function (errorResponse) {
      resetOnSuccess(errorResponse.success),
        vm.onError
          ? vm.onError(errorResponse)
          : $dialogAlert(
              CONST_COMMON.GENERIC_ERROR_TITLE,
              CONST_COMMON.MESSAGE_FAILED
            );
    };
    $(document).ready(function () {
      $(".slick-responsive").slick({
        dots: !0,
        infinite: !0,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: !0,
        autoplaySpeed: 2500,
        arrows: !1,
        responsive: [
          {
            breakpoint: 1496,
            settings: { slidesToShow: 4, slidesToScroll: 3 },
          },
          {
            breakpoint: 1196,
            settings: { slidesToShow: 3, slidesToScroll: 2 },
          },
          { breakpoint: 896, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
      });
    });
  },
]);
