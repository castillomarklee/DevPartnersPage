'use strict';

app.constant('MAPS_KEY', '@@gMapsKey');
app.constant('FB_ID', '@@fbSDKAppID');
app.constant('JS_REQUIRES', {
  scripts: {
    //*** Javascript plugins
    MSAPI: [
      'https://secure.aadcdn.microsoftonline-p.com/lib/0.1.1/js/msal.min.js',
      'core/graph-js-sdk-web.js'
    ],
    ScrollMagic: [
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/animation.gsap.min.js'
    ],
    AdWordsTracker: [
      '//www.googleadservices.com/pagead/conversion_async.js',
      'core/services/adWordsConversionTracker.js'
    ],
    //*** Controllers
    HomeCtrl: ['home/homeCtrl.js?v=@@homeVersion'],
    LandingCtrl: ['v3Landing/landingCtrl.js?v=1'],
    v3HomeCtrl: ['v3Home/v3HomeCtrl.js?v=1'],
    LoginCtrl: [
      'login/loginCtrl.js?v=@@loginVersion',
      'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
      'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
      'bower_components/ng-scrollbars/dist/scrollbars.min.js'
    ],
    WelcomeCtrl: 'welcome/welcomeCtrl.js?v=1',
    DevelopersCtrl: 'developersPage/developersCtrl.js?v=@@developersVersion',
    ForgotPasswordCtrl: 'forgotpassword/forgotPasswordCtrl.js?v=1',
    ResetPasswordCtrl:
      'resetPassword/resetPasswordCtrl.js?v=@@resetPasswordVersion',
    VerificationCtrl: 'verification/verificationCtrl.js?v=1',
    OurPeopleCtrl: [
      'ourpeople/ourPeopleCtrl.js?v=@@ourPeopleVersion',
      'core/services/devPartnersFeaturedTalents.js?v=@@devPartnersFeaturedTalentsVersion'
    ],
    AboutUsVideoCtrl: 'aboutus/video/videoCtrl.js?v=@@aboutUsVideoVersion',
    WhyCtrl: 'why/whyCtrl.js?v=@@whyVersion',
    RequestQuoteCtrl: [
      'leadRequestQuote/requestQuoteCtrl.js?v=@@requestQuoteVersion'
    ],
    ScheduleCallCtrl: [
      'leadScheduleCall/scheduleCallCtrl.js?v=@@scheduleCallVersion'
    ],
    SignupCtrl: ['signup2/signupCtrl.js?v=@@signupVersion'],
    ExternalSignUpCtrl: ['signup2/external/externalCtrl.js?v=@@signupVersion'],
    GetStartedCtrl: [
      'getstarted/getStartedCtrl.js?v=@@getStartedVersion',
      'getstarted/getStartedV2Ctrl.js?v=@@getStartedVersion'
    ],
    GetStartedMobileCtrl: [
      'getstarted/getStartedCtrl.js?v=@@getStartedVersion',
      'getstarted/mobile/options/modalGetStartedOptionsCtrl.js?v=@@modalGetStartedOptions',
      'getstarted/mobile/getStartedMobileViewCtrl.js?v=1',
      'getstarted/getStartedV2Ctrl.js?v=@@getStartedVersion'
    ],
    SchedCallConfirmationCtrl:
      'getstarted/confirmation/schedCallConfirmationCtrl.js?v=1',
    QuoteSummaryCtrl:
      'quoteSummary/quoteSummaryCtrl.js?v=@@quoteSummaryVersion',
    FinalizeQuoteCtrl:
      'admin/quote/finalizeQuoteCtrl.js?v=@@adminFinalizeQuote',
    ClientDashboardCtrl: 'client/dashboard/dashboardCtrl.js?v=1',
    ClientProfileCtrl: 'client/profile/profileCtrl.js?v=1',
    CompleteRequestQuoteCtrl: 'client/requestQuote/requestQuoteCtrl.js?v=1',
    CompleteScheduleCallCtrl: 'client/scheduleCall/scheduleCallCtrl.js?v=1',
    AddRoleCtrl: 'core/modal/addRoleModalCtrl.js?v=@@addRoleModalVersion',
    GenericPageController: 'core/generic/genericPageCtrl.js?v=1',
    UnsubscribeCtrl: 'unsubscribeNewsletter/unsubscribeCtrl.js?v=1',
    ConfirmationPageCtrl: 'signup/confirmation/confirmationCtrl.js?v=1',
    UsersManagementCtrl:
      'admin/userManagement/usersManagementCtrl.js?v=@@adminUsersVersion',
    AddAdminCtrl: 'admin/userManagement/add/addAdminCtrl.js?v=1',
    ViewAdminCtrl:
      'admin/userManagement/view/viewAdminCtrl.js?v=@@adminViewAdminVersion',
    CompleteAdminProfileCtrl:
      'admin/completeProfile/completeProfileCtrl.js?v=@@completeAdminProfileVersion',
    CreateBlogEntryCtrl: [
      'admin/cms/create/createBlogEntryCtrl.js?v=@@createBlogEntryVersion',
      'bower_components/tinymce/tinymce.min.js',
      'bower_components/angular-ui-tinymce/dist/tinymce.min.js',
      'bower_components/bootstrap-select/dist/css/bootstrap-select.min.css'
    ],
    ViewAllBlogEntriesCtrl:
      'admin/cms/viewAll/viewAllEntriesCtrl.js?v=@@cmsViewAllPostsVersion',
    ViewPostCtrl: [
      'bower_components/ng-timeago/ngtimeago.js',
      'blogPost/view/viewPostCtrl.js?v=@@viewPostVersion'
    ],
    FeaturedPostsCtrl: [
      'bower_components/ng-timeago/ngtimeago.js',
      'blogPost/featuredPosts/featuredPostsCtrl.js?v=1'
    ],
    MediaLibCtrl: 'admin/mediaLib/mediaLibCtrl.js?v=@@mediaLibVersion',
    ServicesCtrl: 'ourServices/servicesCtrl.js?v=@@servicesVersion',
    RemoteVACtrl: [
      'ourServices/remoteVA/remoteVASlides.js?v=1',
      'ourServices/remoteVA/remoteVADetails.js',
      'ourServices/remoteVA/remoteVACtrl.js?v=4'
    ],
    SoftwareDevelopmentCtrl: [
      'ourServices/softwareDevelopment/softwareDevTools.js?v=2',
      'ourServices/softwareDevelopment/softwareDevelopmentCtrl.js?v=@@softwareDevVersion'
    ],
    UXUIDesignStrategyCtrl: [
      'ourServices/uxuiDesignStrategy/uxuiDesignStrategyCtrl.js?v=@@uxuiDesignVersion'
    ],
    ViewBlogCtrl: ['blogPost/view/viewBlogCtrl.js?v=@@viewBlogVersion'],
    BlogArchiveCtrl: ['blogPost/blogArchive/blogArchiveCtrl.js?v=2'],
    BlogRecommendations: [
      'blogPost/recommendedPosts/blogRecommendationsCtrl.js?v=5',
      'blogPost/recommendedPosts/recommendedPosts.js'
    ],
    ReferralCtrl: ['referral/referralCtrl.js?v=@@referralVersion'],
    PromoCtrl: ['referralPromo/promoCtrl.js?v=@@promoVersion'],
    GetPromoCodesCtrl: ['referralPromo/getPromo/getPromoCodeCtrl.js?v=3'],
    ModalSubscriptionCtrl: ['subscription/modalSubscriptionCtrl.js?v=1'],
    FrontEndDevCtrl: ['featuredTalents/frontendDevCtrl.js?v=4'],
    BackEndDevCtrl: ['featuredTalents/backendDevCtrl.js?v=4'],
    LandingPage: [
      'featuredTalents/landingPageCtrl.js?v=@@landingPageVersion',
      'core/services/devPartnersFeaturedTalents.js?v=@@devPartnersFeaturedTalentsVersion',
      'core/directives/featuredTalentsSlider/featuredTalentsSlider.js?v=@@devPartnersFeaturedTalentsVersion',
      'bower_components/ng-timeago/ngtimeago.js'
    ],
    ShareViaEmail: [
      'referral/shareViaEmail/shareViaEmailCtrl.js?v=@@shareViaEmail',
      'core/services/msAuthService.js',
      'core/services/emailAddressBookService.js?v=@@emailAddressBookServiceVersion',
      'core/directives/emailAddressBook/emailAddressBook.js?v=1'
    ],
    LeadInfoModalCtrl: [
      'getstarted/leadInfoModal/leadInfoModalCtrl.js?v=@@leadInfoModalVersion'
    ],
    ViewReferralsCtrl: [
      'admin/referrals/viewReferrals/ViewReferralsCtrl.js?v=@@viewReferralsVersion'
    ],
    GenerateReferralsReportCtrl: [
      'bower_components/ng-tags-input/ng-tags-input.min.js',
      'bower_components/ng-tags-input/ng-tags-input.bootstrap.min.css',
      'admin/referrals/generateReport/GenerateReferralsReportCtrl.js'
    ],
    ViewCategoriesCtrl: ['admin/categories/view/viewCategoriesCtrl.js?v=1'],
    CreateCategoryCtrl: ['admin/categories/create/createCategoryCtrl.js?v=1'],
    ViewSubcategoriesCtrl: [
      'admin/subcategories/view/viewSubcategoriesCtrl.js?v=1'
    ],
    CreateSubcategoryCtrl: [
      'admin/subcategories/create/createSubcategoryCtrl.js?v=1'
    ],
    //*** Services
    YoutubeAsyncLoader: 'core/services/ytAsyncLoader.js',
    Toast: 'core/services/toast.js',
    WhyFAQs: 'why/faqs/faqs.js',
    //*** Directives
    trackedTable: [
      'core/directives/trackedTable/trackedTable.js',
      'core/directives/trackedTable/trackedTableRow.js',
      'core/directives/trackedTable/trackedTableCell.js'
    ],
    trackedTableRow: 'core/directives/trackedTable/trackedTableRow.js',
    trackedTableCell: 'core/directives/trackedTable/trackedTabelCell.js',
    ShareContent: 'core/directives/shareContent.js?v=@@shareContentVersion',
    FeaturedCoreServices:
      'core/directives/featuredCoreServices/featuredCoreServices.js?v=@@featuredCoreServicesVersion',
    FeaturedTalentsSlider: [
      'core/services/devPartnersFeaturedTalents.js?v=@@devPartnersFeaturedTalentsVersion',
      'core/directives/featuredTalentsSlider/featuredTalentsSlider.js?v=@@devPartnersFeaturedTalentsVersion'
    ]
  },
  styles: {
    BootstrapSelectStyles:
      'bower_components/bootstrap-select/dist/css/bootstrap-select.min.css'
  },
  //*** angularJS Modules
  modules: [
    {
      name: 'angular-flexslider',
      files: [
        'bower_components/flexslider/jquery.flexslider-min.js',
        'core/angular-flexslider.js',
        'bower_components/flexslider/flexslider.css'
      ]
    },
    {
      name: 'ngImgCrop',
      files: [
        'bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
        'bower_components/ngImgCrop/compile/minified/ng-img-crop.css'
      ]
    },
    {
      name: 'bootstrapSelect',
      files: [
        'bower_components/bootstrap-select/dist/css/bootstrap-select.min.css'
      ]
    },
    {
      name: 'ngToast',
      files: [
        'bower_components/ngtoast/dist/ngToast.min.js',
        'bower_components/ngToast/dist/ngToast.min.css'
      ]
    },
    {
      name: 'ngTable',
      files: ['ng-table/ng-table.min.js', 'ng-table/ng-table.min.css']
    },
    {
      name: 'bootstrapSwitch',
      files: [
        'bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
        'bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css'
      ]
    },
    {
      name: 'ui.tinymce',
      files: [
        'bower_components/tinymce/tinymce.min.js',
        'bower_components/angular-ui-tinymce/dist/tinymce.min.js'
      ]
    },
    {
      name: 'ngScrollbars',
      files: [
        'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
        'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
        'bower_components/ng-scrollbars/dist/scrollbars.min.js'
      ]
    },
    {
      name: 'angular-moment',
      files: [
        'bower_components/moment/min/moment-with-locales.js',
        'bower_components/angular-moment/angular-moment.min.js'
      ]
    }
  ]
});
app.constant('API', {
  // END_POINT: '/api',
  // END_POINT: 'http://13.75.89.123:8082/api',
  END_POINT: 'https://devpartners.co/api',
  HOST: '/',
  TOKEN_NAME: 'XSRF-TOKEN',
  TOKEN_NAME_KEY: 'tokenName',
  Y_CLIENT: '@@YahooClientId',
  Y_REDIRECT: '@@YahooRedirectUri'
});
app.constant('AUTH_PROVIDER', {
  GOOGLE: 'google',
  FACEBOOK: 'facebook'
});
app.constant('STATES', {
  AUTH: 'auth',
  LOGIN: 'public.login',
  FORGOT_PASSWORD: 'public.forgotPassword',
  USER_UNVERIFIED: 'public.userUnverified',
  PUBLIC: 'public',
  HOME: 'public.home',
  HIRE: 'public.hire',
  GET_STARTED: 'public.hire.getStarted',
  REQUEST_QUOTE: 'public.hire.requestQuote',
  SCHEDULE_CALL: 'public.hire.scheduleCall',
  SIGNUP: 'public.signup',
  EXTERNAL_SIGNUP: 'public.externalSignup',
  SERVICES: 'public.services',
  RECRUITMENT: 'public.services.recruitment',
  SOFTWARE_DEVELOPMENT: 'public.services.softwareDevelopment',
  UIUX_DESIGN_STRATEGY: 'public.services.ui-uxDesignStrategy',
  PRODUCT_MANAGEMENT: 'public.services.productManagement',
  REMOTE_ADMIN_MANAGEMENT: 'public.services.remoteAdminManagement',
  WELCOME: 'public.welcome',
  OUR_PEOPLE: 'public.ourPeople',
  WHY: 'public.why',
  FAQS: 'public.faqs',
  TESTIMONIALS: 'public.testimonials',
  PRIVACY_POLICY: 'public.privacyPolicy',
  RESET_PASSWORD: 'public.resetPassword',
  VERIFICATION: 'public.verification',
  QUOTE_SUMMARY: 'public.quoteSummary',
  UNSUBSCRIBE: 'public.unsubscribe',
  COMPLETE_PROFILE: 'public.completeProfile',
  VIEW_BLOG_POST: 'public.viewBlogPost',
  BLOG: 'public.blog',
  REFERRAL: 'public.referral',
  PROMO: 'public.promo',
  DEVELOPERS: 'public.developers',
  FEATURED_FRONTEND: 'public.featured.frontend',
  FEATURED_BACKEND: 'public.featured.backend',
  FEATURED_TALENTS: 'public.featuredTalents',
  FEATURED_TALENTS_FRONTEND: 'public.featuredTalents.frontend',
  FEATURED_TALENTS_BACKEND: 'public.featuredTalents.backend',
  FEATURED_TALENTS_FULLSTACK: 'public.featuredTalents.fullstack',
  FEATURED_TALENTS_DEVELOPER: 'public.featuredTalents.developer',
  FEATURED_TALENTS_MOBILE: 'public.featuredTalents.mobile',
  FEATURED_TALENTS_QUALITY_ASSURANCE: 'public.featuredTalents.qualityAssurance',
  FEATURED_TALENTS_ANGULARJS: 'public.featuredTalents.angularjs',
  FEATURED_TALENTS_ASPNET: 'public.featuredTalents.aspnet',
  FEATURED_TALENTS_REACTJS: 'public.featuredTalents.reactjs',
  FEATURED_TALENTS_RUBY: 'public.featuredTalents.ruby',
  FEATURED_TALENTS_PYTHON: 'public.featuredTalents.python',
  FEATURED_TALENTS_LARAVEL: 'public.featuredTalents.laravel',
  FEATURED_TALENTS_PHP: 'public.featuredTalents.php',
  FEATURED_TALENTS_WEB: 'public.featuredTalents.web',
  FEATURED_TALENTS_FREELANCE: 'public.featuredTalents.freelance',
  DEV_HUB_SURVEY: 'public.devhub',
  ADMIN: 'admin',
  ADMIN_DASHBOARD: 'admin.dashboard',
  ADMIN_USERS: 'admin.users',
  ADMIN_FINALIZE_QUOTE: 'admin.finalizeQuote',
  ADMIN_CMS: 'admin.cms',
  ADMIN_CMS_POSTS: 'admin.cms.posts',
  ADMIN_CMS_CREATE_ENTRY: 'admin.cms.createEntry',
  ADMIN_CMS_EDIT_ENTRY: 'admin.cms.editEntry',
  ADMIN_MEDIA_LIBRARY: 'admin.medialib',
  ADMIN_REFERRALS: 'admin.referrals',
  ADMIN_SETTINGS: 'admin.settings',
  ADMIN_SETTINGS_CATEGORIES: 'admin.settings.categories',
  ADMIN_SETTINGS_SUBCATEGORIES: 'admin.settings.subcategories',
  APP: 'app',
  APP_CLIENT_DASHBOARD: 'app.clientDashboard',
  APP_REQUEST_QUOTE: 'app.requestQuote',
  APP_SCHEDULE_CALL: 'app.scheduleCall',
  APP_REQUEST_QUOTE_CONFIRMATION: 'app.requestQuoteConfirmation',
  APP_SCHEDULE_CALL_CONFIRMATION: 'app.scheduleCallConfirmation',
  APP_CONTACT_US_CONFIRMATION: 'app.contactUsConfirmation',
  APP_USER_PROFILE: 'app.userProfile',

  PUBV3: 'pubv3',
  HOME_V3: 'pubv3.homeV3',
  LANDING_V3: 'pubv3.landingV3',

  POOLING: 'public.pooling'
});
app.constant('SPINNER_CONFIGS', {
  spinnerSM: { radius: 4, width: 2, length: 4 },
  spinnerMD: { radius: 15, width: 4, length: 8 },
  spinnerLG: { radius: 30, width: 8, length: 16 }
});
app.constant('SCROLLBAR_CONFIG', {
  SCROLLABLE_PANEL: {
    theme: 'dark-3',
    advanced: {
      updateOnContentResize: true
    },
    scrollInertia: 50,
    scrollButtons: {
      enable: false
    }
  }
});
app.constant('MEDIA_QUERY_BP', {
  SCREEN_LG: 1200,
  SCREEN_MD: 992,
  SCREEN_SM: 768,
  SCREEN_XS: 480
});
app.constant('CONST_STORAGE', {
  ACCOUNT: 'account',
  TEAM: 'team',
  TEAMS: 'teams',
  TIMEFRAMES: 'timeframes',
  USER: 'user',
  CURRENCIES: 'currencies'
});
app.constant('G_AUTH_API', {
  web: {
    client_id:
      '598322038406-gdlrl1khbdngbg6m25m27u47qqvadtdm.apps.googleusercontent.com',
    api_key: 'AIzaSyBX5XRjAH9SwfT0zY3SkBgg_dq6_ZTaZF4'
  }
});
app.constant('MSAPI_CONFIG', {
  clientId: '9006aaac-89d8-40db-a416-43c8dc379272',
  redirectUri: 'https://devpartners.co/refer',
  interactionMode: 'popUp',
  graphEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphScopes: ['user.read contacts.read']
});
app.constant('CORS_PROXY', 'https://cors-anywhere.herokuapp.com/');
app.constant('CLAIMS', {
  ALL: 'all',
  ADMIN_VIEW_LIST: 'adminViewList',
  ADMIN_CHANGE_STATUS: 'adminChangeStatus',
  ADMIN_CREATE_NEW: 'adminCreateNew',
  ADMIN_DELETE: 'adminDelete',
  MANAGE_BLOG: 'manageBlog',
  CRM: 'crm',
  MANAGE_REFERRALS: 'referrals'
});
app.constant('ANALYTICS', {
  EVENT_REQUEST_QUOTE: 'Send Request Button',
  EVENT_SCHEDULE_CALL: 'Set Schedule Button',
  EVENT_SIGNUP: 'Sign Up Button',
  ACTION_CLICK: 'click',
  GET_STARTED_CONTACT: 'Send Get Started Contact Form',
  LEAD_CONTACT_FORM: 'Lead Contact Form',
  GET_STARTED_PROJECT: 'Send Get Started Project Description',
  PROJECT_DESCRIPTION: 'Get Started Project Description'
});
