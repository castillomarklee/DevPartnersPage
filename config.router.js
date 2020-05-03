app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES', 'STATES', 'MobileCheckerProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $urlMatcherFactoryProvider, $provide, $ocLazyLoadProvider, jsRequires, STATES, MobileChecker) {
        $locationProvider.html5Mode({ enabled: true, requireBase: true });
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);

        // lazy modules
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });

        //http interceptor
        $provide.factory('HttpInterceptor', ['$location', '$q', '$injector', 'ResponseValidator', function ($location, $q, $injector, ResponseValidator) {
            return {
                request: function (config) {
                    return config || $q.when(config);
                },
                requestError: function (request) {
                    return $q.reject(request);
                },
                response: function (response) {
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    var url = response.config.url;
                    if (url.indexOf('@@apiUrl') != -1 && (response.status === 401 || (ResponseValidator.isErrorResponseValid(response) && response.data.error.status == 401))) {
                        var AccountService = $injector.get('AccountService');
                        AccountService.clearSession();
                        $location.path('/user-login');
                        return $q.reject(response);
                    } else {
                        return $q.reject(response);
                    }
                }
            };
        }]);

        $httpProvider.interceptors.push('HttpInterceptor');
        //end: http interceptor

        //APPLICATION ROUTES
        // For any unmatched url, redirect to
        $urlRouterProvider.when("/app", "/app/dashboard");
        $urlRouterProvider.when("/agent", "/agent/dashboard");
        $urlRouterProvider.when("/agent/cms", "/agent/cms/posts");
        $urlRouterProvider.when("/about-us", "/our-people");
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state(STATES.PUBLIC, {
                templateUrl: 'public.html?v=11',
                abstract: true,
                requireLogin: false,
                logo: 'light'
            })
            .state(STATES.HOME, {
                url: "/",
                templateUrl: "home/home.html?v=@@homeVersion",
                controller: 'HomeCtrl',
                controllerAs: 'homeVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngScrollbars').files,
                            // getModule('slickCarousel').files,
                            // getModule('angularSlick').files,
                            jsRequires.scripts.FeaturedTalentsSlider,
                            jsRequires.scripts.HomeCtrl);
                    }]
                },
                data: {
                   // topNavClasses: 'top-nav top-nav-light',
                    topNavClasses : 'top-nav top-nav-not-fixed top-nav-no-contacts',
                    mainContentClasses : 'no-contact-links',
                    footerClasses: 'footer-dark'
                }
            })

            .state(STATES.PUBV3, {
                templateUrl: 'pubv3.html?V=1',
                abstract: true,
                requireLogin: false,
                logo: 'light'
            })
            .state(STATES.LANDING_V3, {
                url: "/message",
                templateUrl: "v3Landing/landing.html",
                controller: 'LandingCtrl',
                // controllerAs: 'landingVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngScrollbars').files,
                            jsRequires.scripts.FeaturedTalentsSlider,
                            jsRequires.scripts.LandingCtrl);
                    }]
                }
            })

            .state(STATES.HOME_V3, {
                url: "/pubhome",
                templateUrl: "v3Home/v3home.html",
                controller: 'v3HomeCtrl',
                controllerAs: 'v3HomeVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            // getModule('ngScrollbars').files,
                            // jsRequires.scripts.FeaturedTalentsSlider,
                            jsRequires.scripts.v3HomeCtrl);
                    }]
                }
            })

            .state(STATES.HIRE, {
                // templateUrl: MobileChecker.isMobileByScreenSize() ? "getstarted/mobile/m-get-started.html?v=@@getStartedVersion" : "getstarted/get-started.html?v=@@getStartedVersion",
                templateUrl: "getstarted/get-started-layout2.html?v=@@getStartedVersion",
                //abstract: true,
                controller: 'GetStartedV2Ctrl',
                controllerAs: "getStartedVM",
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts',
                    mainContentClasses: 'no-footer',
                    footerClasses: 'footer-hidden',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.GET_STARTED, {
                url: "/get-started?referrerCode&promoCode&{adCode:any}",
                templateUrl: MobileChecker.isMobileByScreenSize() ? "getstarted/mobile/m-project-requirements.html?v=@@getStartedProjectRequirementsVersion" : "getstarted/project-requirements.html?v=@@getStartedProjectRequirementsVersion",
                resolve: loadSequence("angular-flexslider", "bootstrapSelect", "ngToast", "Toast", "AdWordsTracker", MobileChecker.isMobileByScreenSize() ? "GetStartedMobileCtrl" : "GetStartedCtrl", "AddRoleCtrl"),
                controller: MobileChecker.isMobileByScreenSize() ? 'GetStartedMobileCtrl' : 'GetStartedCtrl',
                controllerAs: "getStartedVM",
                params: {
                    provider: null,
                    missingFields: null,
                    referrerCode: undefined,
                    promoCode: undefined,
                    adCode: undefined,
                    lead: undefined
                },
                data: {
                    hideChatButton: MobileChecker.isMobileByScreenSize()
                }
            })
            .state(STATES.REQUEST_QUOTE, {
                url: "/get-started/request-quote?{adCode:any}",
                templateUrl: "leadRequestQuote/request-quote.html?v=@@requestQuoteVersion",
                controller: "RequestQuoteCtrl",
                controllerAs: "requestQuoteVM",
                resolve: {
                    loadDeps: [
                        'DependenciesLoader',
                        function(DependenciesLoader) {
                            return DependenciesLoader.load(
                                getModule('bootstrapSelect').files,
                                getModule('ngToast').files,
                                jsRequires.scripts.Toast,
                                jsRequires.scripts.RequestQuoteCtrl,
                                jsRequires.scripts.AdWordsTracker);
                        }
                    ]
                },
                params: {
                    data: null,
                    adCode: undefined
                }
            })
            .state(STATES.SCHEDULE_CALL, {
                url: "/get-started/schedule-call?{adCode:any}",
                templateUrl: "leadScheduleCall/schedule-call.html?v=@@scheduleCallVersion",
                controller: "ScheduleCallCtrl",
                controllerAs: "scheduleCallVM",
                resolve: {
                    loadDeps: [
                        'DependenciesLoader',
                        function (DependenciesLoader) {
                            return DependenciesLoader.load(
                                getModule('bootstrapSelect').files,
                                getModule('ngToast').files,
                                jsRequires.scripts.Toast,
                                jsRequires.scripts.ScheduleCallCtrl,
                                jsRequires.scripts.AdWordsTracker
                            );
                        }
                    ]
                },
                params: {
                    data: null,
                    adCode: undefined
                }
            })
            .state(STATES.SIGNUP, {
                url: "/user-signup?{adCode:any}",
                templateUrl: "signup2/signup.html?v=@@signupVersion",
                controller: 'SignupCtrl',
                controllerAs: 'signupVM',
                resolve: {
                    loadDeps: [
                        'DependenciesLoader',
                        function (DependenciesLoader) {
                            return DependenciesLoader.load(
                                getModule('bootstrapSelect').files,
                                getModule('ngToast').files,
                                jsRequires.scripts.Toast,
                                jsRequires.scripts.SignupCtrl,
                                jsRequires.scripts.AdWordsTracker
                            );
                        }
                    ]
                },
                params: {
                    data: null,
                    adCode: undefined
                },
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.EXTERNAL_SIGNUP, {
                url: "/user-ext-signup?{adCode:any}",
                templateUrl: "signup2/external/external.html?v=1",
                controller: 'ExternalSignUpCtrl',
                controllerAs: 'extSignupVM',
                resolve: loadSequence(
                    'bootstrapSelect',
                    'ExternalSignUpCtrl',
                    'SignupCtrl'
                ),
                resolve: {
                    loadDeps: [
                        'DependenciesLoader',
                        function(DependenciesLoader) {
                            return DependenciesLoader.load(
                                getModule('bootstrapSelect').files,
                                jsRequires.scripts.ExternalSignUpCtrl,
                                jsRequires.scripts.SignupCtrl
                            );
                        }
                    ]
                },
                params: {
                    data: null,
                    authProvider: null,
                    missingFields: null,
                    adCode: undefined
                },
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.AUTH, {
                abstract: true,
                views: {
                    "auth-view": {
                        template: '<div class="auth-view-content" ui-view></div>',
                        controller: function($scope) {
                            $scope.$on('$stateChangeStart', function (event, toState, toParams) {
                                $scope.showView = toState.name.startsWith(STATES.AUTH);
                            });
                        }
                    }
                }
            })
            .state(STATES.LOGIN, {
                url: "/user-login?{stateToRedirectTo:any}&{referenceCode:any}",
                templateUrl: "login/login.html?v=@@loginVersion",
                controller: 'LoginCtrl',
                controllerAs: 'loginVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngScrollbars').files,
                            jsRequires.scripts.LoginCtrl
                        );
                    }]
                },
                data: {
                    topNavClasses: 'top-nav',
                    mainContentClasses: 'no-footer',
                    footerClasses: 'footer-hidden',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true
                },
                params: {
                    stateToRedirectTo: undefined,
                    referenceCode: undefined
                }
            })
            .state(STATES.FORGOT_PASSWORD, {
                url: "/user/forgot-password",
                templateUrl: "forgotpassword/forgot-password.html",
                controller: "ForgotPasswordCtrl",
                controllerAs: "forgotPasswordVM",
                resolve: loadSequence('ForgotPasswordCtrl'),
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.USER_UNVERIFIED, {
                url: "/user/unverified",
                templateUrl: "login/unverified-user.html?v=1",
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.SERVICES, {
                url: "/services",
                templateUrl: "ourServices/services.html?v=@@servicesVersion",
                controller: 'ServicesCtrl',
                controllerAs: 'servicesVM',
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts',
                    mainContentClasses: 'no-contact-links',
                    footerClasses: 'footer-dark',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true,
                    hideChatButton: MobileChecker.isTinyMobileByScreenSize()
                },
                resolve: loadSequence('ServicesCtrl')
            })
            .state(STATES.SOFTWARE_DEVELOPMENT, {
                url: "/software-development",
                templateUrl: "ourServices/softwareDevelopment/software-development.html?v=@@softwareDevVersion",
                controller: "SoftwareDevelopmentCtrl",
                controllerAs: "vm",
                data: {
                    pageTitle: 'Software Development'
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.ScrollMagic,
                            jsRequires.scripts.SoftwareDevelopmentCtrl
                        );
                    }]
                }
            })
            .state(STATES.UIUX_DESIGN_STRATEGY, {
                url: '/ui-ux-design-strategy',
                templateUrl: 'ourServices/uxuiDesignStrategy/uxui-design-strategy.html?v=@@uxuiDesignVersion',
                controller: 'UXUIDesignStrategyCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'UX/UI Design Strategy',
                    description: 'We have access to skilled and creative UI/UX designers who have keen interest in designing intuitive and practical UI/UX. DevPartners network includes expert designers across a very wide array of categories.'
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.ScrollMagic,
                            jsRequires.scripts.UXUIDesignStrategyCtrl
                        );
                    }]
                }
            })
            .state(STATES.PRODUCT_MANAGEMENT, {
                url: "/product-management",
                templateUrl: "ourServices/productManagement/product-management.html?v=2",
                data: {
                    pageTitle: 'Product Management'
                }
            })
            .state(STATES.REMOTE_ADMIN_MANAGEMENT, {
                url: "/remote-admin-management",
                templateUrl: "ourServices/remoteVA/remote-va.html?v=3",
                controller: "RemoteVACtrl",
                controllerAs: "remoteVAVM",
                data: {
                    pageTitle: 'Virtual Assistance'
                },
                resolve: loadSequence('ngScrollbars', 'RemoteVACtrl')
            })
            .state(STATES.WELCOME, {
                url: "/welcome-user",
                templateUrl: "welcome/welcome.html",
                controller: 'WelcomeCtrl',
                controllerAs: 'welcomeVM',
                resolve: loadSequence('WelcomeCtrl'),
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark'
                },
                params: {
                    referenceCode: null
                }
            })
            .state(STATES.OUR_PEOPLE, {
                url: "/team",
                templateUrl: "ourpeople/our-people.html?v=@@ourPeopleVersion",
                controller: "OurPeopleCtrl",
                controllerAs: "ourPeopleVM",
                // resolve: loadSequence('OurPeopleCtrl', 'FeaturedCoreServices'),
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngScrollbars').files,
                            // getModule('slickCarousel').files,
                            // getModule('angularSlick').files,
                            // jsRequires.scripts.FeaturedTalentsSlider,
                            jsRequires.scripts.OurPeopleCtrl);
                    }]
                },
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts',
                    mainContentClasses: 'no-contact-links',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.DEVELOPERS, {
                url: "/process",
                templateUrl: "developersPage/developers.html?v=@@developersVersion",
                controller: 'DevelopersCtrl',
                controllerAs: 'vm',
                resolve: loadSequence('DevelopersCtrl'),
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts top-nav-light',
                    mainContentClasses: 'no-contact-links',
                    footerClasses: 'footer-dark',
                    heading: {
                        text: "Dev Partners provides expert back-end and front-end resources.",
                        highlight: "Dev Partners"
                    },
                    isSoftwareDev: true,
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.WHY, {
                url: "/why-us",
                templateUrl: "why/whyv3.html?v=1",
                controller: "WhyCtrl",
                controllerAs: "whyVM",
                resolve: loadSequence('ngScrollbars', 'WhyCtrl', 'angular-flexslider'),
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts',
                    mainContentClasses: 'no-footer no-contact-links',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.FAQS, {
                url: "/faqs",
                templateUrl: "faqsPage/faqs.html",
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.TESTIMONIALS, {
                url: "/testimonials",
                templateUrl: "testimonialsPage/testimonials.html?v=@@testimonialsVersion",
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.PRIVACY_POLICY, {
                url: "/privacy-policy",
                templateUrl: "privacyPolicy/privacy-policy.html",
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.RESET_PASSWORD, {
                url: "/user/reset-password",
                templateUrl: "resetPassword/reset-password.html?v=@@resetPasswordVersion",
                controller: "ResetPasswordCtrl",
                controllerAs: "resetPasswordVM",
                resolve: loadSequence('ResetPasswordCtrl'),
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.VERIFICATION, {
                url: "/user/verification",
                templateUrl: "verification/verification.html",
                controller: "VerificationCtrl",
                controllerAs: "verificationVM",
                resolve: loadSequence('VerificationCtrl'),
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.COMPLETE_PROFILE, {
                url: "/admin/complete-profile",
                templateUrl: "admin/completeProfile/complete-profile.html?v=@@completeAdminProfileVersion",
                controller: 'CompleteAdminProfileCtrl',
                controllerAs: 'completeProfileVM',
                params: {
                    guid: undefined,
                    token: undefined
                },
                data: {
                    noPromoSubscriptionPrompt: true
                },
                resolve: loadSequence("CompleteAdminProfileCtrl")
            })
            .state(STATES.QUOTE_SUMMARY, {
                url: "/quote-summary",
                templateUrl: "quoteSummary/quote-summary.html?v=@@quoteSummaryVersion",
                controller: "QuoteSummaryCtrl",
                controllerAs: "quoteSummaryVM",
                resolve: loadSequence('QuoteSummaryCtrl')
            })
            .state(STATES.UNSUBSCRIBE, {
                url: '/unsubscribe',
                templateUrl: 'unsubscribeNewsletter/unsubscribe.html?v=@@unsubscribeVersion',
                controller: 'UnsubscribeCtrl',
                controllerAs: 'unsubscribeVM',
                resolve: loadSequence('UnsubscribeCtrl')
            })
            .state(STATES.BLOG, {
                url: '/blog',
                templateUrl: 'blogPost/view/view-blog.html?v=@@viewBlogVersion',
                controller: 'ViewBlogCtrl',
                controllerAs: 'blogVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('bootstrapSelect').files,
                            getModule('ngScrollbars').files,
                            jsRequires.scripts.ShareContent,
                            jsRequires.scripts.FeaturedPostsCtrl,
                            jsRequires.scripts.BlogArchiveCtrl,
                            jsRequires.scripts.ViewBlogCtrl
                        );
                    }]
                },
                data: {
                    topNavClasses: 'top-nav top-nav-light',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.VIEW_BLOG_POST, {
                url: '/post/:postId',
                templateUrl: 'blogPost/view/view-post.html?v=@@viewPostVersion',
                controller: 'ViewPostCtrl',
                controllerAs: 'postVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.ShareContent,
                            jsRequires.scripts.BlogRecommendations,
                            jsRequires.scripts.ViewPostCtrl
                        )
                    }]
                },
                params: {
                    postId: undefined
                },
                data: {
                    topNavClasses: 'top-nav',
                    footerClasses: 'footer-dark'
                }
            })
            .state(STATES.REFERRAL, {
                url: '/refer',
                templateUrl: 'referral/referral.html?v=@@referralVersion',
                controller: 'ReferralCtrl',
                controllerAs: 'referralVM',
                resolve: loadSequence(
                    'ShareContent',
                    'ReferralCtrl'
                ),
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts',
                    mainContentClasses: 'no-footer no-contact-links',
                    footerClasses: 'footer-hidden',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.PROMO, {
                url: '/promo',
                templateUrl: 'referralPromo/promo.html?v=@@promoVersion',
                controller: 'PromoCtrl',
                controllerAs: 'promoVM',
                resolve: loadSequence(
                    'PromoCtrl'
                ),
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts',
                    mainContentClasses: 'no-contact-links',
                    footerClasses: 'footer-dark',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.DEV_HUB_SURVEY, {
                url: "/devhub",
                templateUrl: 'devhubMarketing/devhub-survey.html?v=1',
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts',
                    mainContentClasses: 'no-contact-links scrollbars-hidden',
                    mainContainerClasses: 'scrollbars-hidden',
                    footerClasses: 'footer-hidden',
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.ADMIN, {
                url: '/agent',
                templateUrl: 'admin.html?v=@@adminVersion',
                abstract: true,
                data: {
                    topNavClasses: 'top-nav top-nav-bright top-nav-not-fixed top-nav-no-contacts',
                    footerClasses: 'footer-dark',
                    logo: 'light',
                    requireLogin: true,
                    noPromoSubscriptionPrompt: true
                },
                resolve: {
                    loadDeps: ['$$animateJs', 'DependenciesLoader', function ($$animateJs, DependenciesLoader) {
                        return DependenciesLoader.load('assets/stylesheets/dashboard.css');
                    }]
                }
            })
            .state(STATES.ADMIN_DASHBOARD, {
                url: '/dashboard',
                templateUrl: 'admin/dashboard/dashboard.html?v=@@adminDashboardVersion'
            })
            .state(STATES.ADMIN_FINALIZE_QUOTE, {
                url: '/finalize-quote?{referenceCode:any}',
                templateUrl: 'admin/quote/finalize-quote.html?v=@@adminFinalizeQuote',
                controller: 'FinalizeQuoteCtrl',
                controllerAs: 'finalizeQuoteVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('angular-flexslider').files,
                            getModule('bootstrapSelect').files,
                            getModule('ngToast').files,
                            jsRequires.scripts.Toast,
                            jsRequires.scripts.FinalizeQuoteCtrl,
                            jsRequires.scripts.AddRoleCtrl);
                    }]
                },
                params: {
                    referenceCode: undefined
                },
                dat: {
                    hideChatButton: true
                }
            })
            .state(STATES.ADMIN_USERS, {
                url: '/users',
                templateUrl: 'admin/userManagement/users.html?v=@@adminUsersVersion',
                controller: 'UsersManagementCtrl',
                controllerAs: 'userManagementVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngTable').files,
                            getModule('bootstrapSelect').files,
                            jsRequires.scripts.trackedTable,
                            jsRequires.scripts.UsersManagementCtrl
                        );
                    }]
                }
            })
            .state(STATES.ADMIN_CMS, {
                url: '/cms',
                template: '<div id="cms" ui-view></div>',
                abstract: true
            })
            .state(STATES.ADMIN_CMS_POSTS, {
                url: '/posts',
                templateUrl: 'admin/cms/viewAll/view-all-entries.html?v=@@cmsViewAllPostsVersion',
                controller: 'ViewAllBlogEntriesCtrl',
                controllerAs: 'blogVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngTable').files,
                            getModule('bootstrapSelect').files,
                            jsRequires.scripts.ViewAllBlogEntriesCtrl
                        );
                    }]
                }
            })
            .state(STATES.ADMIN_CMS_CREATE_ENTRY, {
                url: '/entry/:postId',
                templateUrl: 'admin/cms/create/create-blog-entry.html?v=@@createBlogEntryVersion',
                controller: 'CreateBlogEntryCtrl',
                controllerAs: 'blogVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.CreateBlogEntryCtrl
                        );
                    }]
                },
                params: {
                    postId: undefined
                }
            })
            .state(STATES.ADMIN_CMS_EDIT_ENTRY, {
                url: '/posts/:postId',
                templateUrl: 'admin/cms/update/update-blog-entry.html',
                params: {
                    postId: undefined
                }
            })
            .state(STATES.ADMIN_MEDIA_LIBRARY, {
                url: '/media-lib',
                templateUrl: 'admin/mediaLib/media-lib.html?v=@@mediaLibVersion',
                controller: 'MediaLibCtrl',
                controllerAs: 'mediaLibVM',
                resolve: loadSequence('MediaLibCtrl')
            })
            .state(STATES.ADMIN_REFERRALS, {
                url: '/referrals',
                templateUrl: 'admin/referrals/viewReferrals/view-referrals.html?v=@@viewReferralsVersion',
                controller: 'ViewReferralsCtrl',
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngTable'),
                            jsRequires.scripts.ViewReferralsCtrl
                        );
                    }]
                }
            })
            .state(STATES.ADMIN_SETTINGS, {
                url: '/settings',
                template: '<div id="settings" ui-view></div>',
                abstract: true
            })
            .state(STATES.ADMIN_SETTINGS_CATEGORIES, {
                url: '/categories',
                templateUrl: 'admin/categories/view/view-categories.html?v=1',
                controller: 'ViewCategoriesCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngTable').files,
                            getModule('bootstrapSelect').files,
                            jsRequires.scripts.trackedTable,
                            jsRequires.scripts.ViewCategoriesCtrl
                        );
                    }]
                }
            })
            .state(STATES.ADMIN_SETTINGS_SUBCATEGORIES, {
                url: '/subcategories',
                templateUrl: 'admin/subcategories/view/view-subcategories.html?v=1',
                controller: 'ViewSubcategoriesCtrl',
                controllerAs: 'subcatVM',
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            getModule('ngTable').files,
                            getModule('bootstrapSelect').files,
                            jsRequires.scripts.trackedTable,
                            jsRequires.scripts.ViewSubcategoriesCtrl
                        );
                    }]
                }
            })
            .state(STATES.APP, {
                url: "/app",
                abstract: true,
                templateUrl: "app.html?v=@@clientVersion",
                data: {
                    requireLogin: true,
                    topNavClasses: 'top-nav top-nav-bright',
                    footerClasses: 'footer-dark',
                    logo: 'light',
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.APP_CLIENT_DASHBOARD, {
                url: "/dashboard",
                templateUrl: "client/dashboard/dashboard.html",
                controller: "ClientDashboardCtrl",
                controllerAs: "clientDashboardVM",
                resolve: loadSequence('ClientDashboardCtrl'),
                params: {
                    referenceCode: null
                }
            })
            .state(STATES.APP_REQUEST_QUOTE, {
                url: "/request-quote",
                templateUrl: "client/requestQuote/request-quote.html",
                controller: "CompleteRequestQuoteCtrl",
                controllerAs: "requestQuoteVM",
                resolve: loadSequence('angular-flexslider', 'bootstrapSelect', 'ngToast', 'Toast', 'CompleteRequestQuoteCtrl', 'GetStartedCtrl', 'AddRoleCtrl')
            })
            .state(STATES.APP_SCHEDULE_CALL, {
                url: "/schedule-call",
                templateUrl: "client/scheduleCall/schedule-call.html",
                controller: "CompleteScheduleCallCtrl",
                controllerAs: "scheduleCallVM",
                resolve: loadSequence('angular-flexslider', 'bootstrapSelect', 'ngToast', 'Toast', 'CompleteScheduleCallCtrl', 'GetStartedCtrl', 'AddRoleCtrl')
            })
            .state(STATES.APP_REQUEST_QUOTE_CONFIRMATION, {
                url: "/get-started/request-quote/confirmation",
                templateUrl: "getstarted/confirmation/request-quote-confirmation.html"
            })
            .state(STATES.APP_SCHEDULE_CALL_CONFIRMATION, {
                url: "/get-started/schedule-call/confirmation",
                templateUrl: "getstarted/confirmation/schedule-call-confirmation.html",
                params: {
                    schedule: null
                },
                controller: 'SchedCallConfirmationCtrl',
                controllerAs: 'confirmationVM',
                resolve: loadSequence('SchedCallConfirmationCtrl')
            })
            .state(STATES.APP_CONTACT_US_CONFIRMATION, {
                url: "/contact-us/message-sent",
                templateUrl: "partials/contactus/contact-us-confirmation.html"
            })
            .state(STATES.APP_USER_PROFILE, {
                url: "/my-profile",
                templateUrl: "client/profile/profile.html",
                controller: 'ClientProfileCtrl',
                controllerAs: 'profileVM',
                resolve: loadSequence('ngImgCrop', 'bootstrapSelect', 'ngToast', 'Toast', 'ClientProfileCtrl')
            })
            .state(STATES.FEATURED_TALENTS, {
                templateUrl: "featuredTalents/featured-talents.html?v=@@featuredTalents",
                abstract: true,
                data: {
                    topNavClasses: 'top-nav top-nav-not-fixed top-nav-no-contacts top-nav-light',
                    mainContentClasses: 'no-contact-links',
                    footerClasses: 'footer-dark',
                    heading: {
                        text: "Dev Partners provides expert back-end and front-end resources.",
                        highlight: "Dev Partners"
                    },
                    isSoftwareDev: true,
                    noPromoSubscriptionPrompt: true
                }
            })
            .state(STATES.FEATURED_FRONTEND, {
                url: "/frontend-development",
                templateUrl: 'featuredTalents/frontend.html?v=3',
                controller: 'FrontEndDevCtrl',
                controllerAs: 'frontendVM',
                resolve: loadSequence('FrontEndDevCtrl')
            })
            .state(STATES.FEATURED_BACKEND, {
                url: "/backend-development",
                templateUrl: 'featuredTalents/backend.html?v=3',
                controller: 'BackEndDevCtrl',
                controllerAs: 'backendVM',
                resolve: loadSequence('BackEndDevCtrl')
            })
            .state(STATES.FEATURED_TALENTS_FREELANCE, {
                url: "/:country/freelance",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'freelance'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_WEB, {
                url: "/:country/web",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'web'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_ANGULARJS, {
                url: "/:country/angularjs",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'angularjs'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_REACTJS, {
                url: "/:country/reactjs",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'reactjs'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function(DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_ASPNET, {
                url: "/:country/aspnet",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'aspnet'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_RUBY, {
                url: "/:country/ruby-on-rails",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'ruby-on-rails'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_PYTHON, {
                url: "/:country/python",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'python'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_LARAVEL, {
                url: "/:country/laravel",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'laravel'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_PHP, {
                url: "/:country/php",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'php'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_FULLSTACK, {
                url: "/:country/fullstack",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'fullstack'
                },
                data: {
                    isSoftwareDev : false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_DEVELOPER, {
                url: "/:country/developers",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'fullstack'
                },
                data: {
                    isSoftwareDev : false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_FRONTEND, {
                url: "/:country/frontend",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'frontend'
                },
                data: {
                    isSoftwareDev : false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_BACKEND, {
                url: "/:country/backend",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'backend'
                },
                data: {
                    isSoftwareDev : false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.FEATURED_TALENTS_MOBILE, {
                url: "/:country/mobile",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'mobile'
                },
                data: {
                    isSoftwareDev: false
                },
                resolve: {
                    loadDeps: [
                        'DependenciesLoader',
                        function (DependenciesLoader) {
                            return DependenciesLoader.load(jsRequires.scripts.LandingPage, jsRequires.scripts.FeaturedCoreServices);
                        }
                    ]
                }
            })
            .state(STATES.FEATURED_TALENTS_QUALITY_ASSURANCE, {
                url: "/:country/quality-assurance",
                templateUrl: 'featuredTalents/landing-page.html?v=@@landingPageVersion',
                controller: 'LandingPageCtrl',
                controllerAs: 'vm',
                params: {
                    country: undefined,
                    technology: 'quality-assurance'
                },
                data: {
                    isSoftwareDev : false
                },
                resolve: {
                    loadDeps: ['DependenciesLoader', function (DependenciesLoader) {
                        return DependenciesLoader.load(
                            jsRequires.scripts.LandingPage,
                            jsRequires.scripts.FeaturedCoreServices
                        );
                    }]
                }
            })
            .state(STATES.POOLING, {
                url: "/Pooling",
                resolve: {
                    loadDeps: [
                        'DependenciesLoader',
                        function (DependenciesLoader) {
                            return;
                        }
                    ]
                }
            });

            // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
            function loadSequence() {
                var dependencies = arguments;
                return {
                    load: ['JS_REQUIRES', '$ocLazyLoad', function (JS_REQUIRES, $ocLazyLoad) {
                        function getDependency(name) {
                            var dep = _.find(JS_REQUIRES.modules, function (module) {
                                return name === module.name;
                            });
                            return dep ? dep.files : JS_REQUIRES.scripts[name];
                        }
                        var dependenciesConfig = [];
                        _.forEach(dependencies, function (depName) {
                            var dep = getDependency(depName);
                            if (_.isArray(dep)) {
                                dependenciesConfig = dependenciesConfig.concat(dep);
                            } else {
                                dependenciesConfig.push(dep);
                            }
                        });
                        return $ocLazyLoad.load(dependenciesConfig);
                    }]
                };
            }

            function getModule(moduleName) {
                return _.find(jsRequires.modules, function(item) {
                    return moduleName === item.name;
                });
            }
    }]);