app.directive('stateTopNavClass', ['$rootScope', '$state', '$timeout', function ($rootScope, $state, $timeout) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, elem, attr, ctrl) {
            elem.ready(function () {
                var classes = angular.isDefined($state.current.data) ? $state.current.data.topNavClasses : undefined;
                if (classes) {
                    elem.addClass(classes);
                }
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $timeout(function () {
                    var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.topNavClasses) ?
                        fromState.data.topNavClasses : null;
                    var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.topNavClasses) ?
                        toState.data.topNavClasses : null;

                    // don't do anything if they are the same
                    if (fromClassnames !== toClassnames) {
                        if (fromClassnames) {
                            elem.removeClass(fromClassnames);
                        }

                        if (toClassnames) {
                            elem.addClass(toClassnames);
                        }
                    }
                });
            });
        }
    }
}]);

app.directive('stateMainContentClass', ['$rootScope', '$state', '$timeout', function ($rootScope, $state, $timeout) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, elem, attr, ctrl) {
            elem.ready(function () {
                var classes = angular.isDefined($state.current.data) ? $state.current.data.mainContentClasses : undefined;
                if (classes) {
                    elem.addClass(classes);
                }
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $timeout(function () {
                    var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.mainContentClasses) ?
                        fromState.data.mainContentClasses : null;
                    var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.mainContentClasses) ?
                        toState.data.mainContentClasses : null;

                    // don't do anything if they are the same
                    if (fromClassnames !== toClassnames) {
                        if (fromClassnames) {
                            elem.removeClass(fromClassnames);
                        }

                        if (toClassnames) {
                            elem.addClass(toClassnames);
                        }
                    }
                });
            });
        }
    }
}]);

app.directive('stateFooterClass', ['$rootScope', '$state', function ($rootScope, $state) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, elem, attr, ctrl) {
            elem.ready(function () {
                var classes = angular.isDefined($state.current.data) ? $state.current.data.footerClasses : undefined;
                if (classes) {
                    elem.addClass(classes);
                }
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.footerClasses) ?
                    fromState.data.footerClasses : null;
                var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.footerClasses) ?
                    toState.data.footerClasses : null;

                if (fromClassnames !== toClassnames) {
                    if (fromClassnames) {
                        elem.removeClass(fromClassnames);
                    }

                    if (toClassnames) {
                        elem.addClass(toClassnames);
                    }
                }
            });
        }
    }
}]);

app.directive('uiSrefIf', function ($compile) {
    return {
        scope: {
            val: '@uiSrefVal',
            if: '=uiSrefIf'
        },
        link: function ($scope, $element, $attrs) {
            $element.removeAttr('ui-sref-if');
            $compile($element)($scope);

            $scope.$watch('if', function (bool) {
                if (bool) {
                    $element.attr('ui-sref', $scope.val);
                } else {
                    $element.removeAttr('ui-sref');
                    $element.removeAttr('href');
                }
                $compile($element)($scope);
            });
        }
    };
});

app.directive('compareTo', function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});

app.directive('currencyInput', function () {
    return {
        restrict: 'A',
        scope: {
            field: '='
        },
        replace: true,
        link: function (scope, element, attrs) {

            $(element).bind('keyup', function (e) {
                var input = element.find('input');
                var inputVal = input.val();

                //clearing left side zeros
                while (scope.field.charAt(0) == '0') {
                    scope.field = scope.field.substr(1);
                }

                scope.field = scope.field.replace(/[^\d.\',']/g, '');

                var point = scope.field.indexOf(".");
                if (point >= 0) {
                    scope.field = scope.field.slice(0, point + 3);
                }

                var decimalSplit = scope.field.split(".");
                var intPart = decimalSplit[0];
                var decPart = decimalSplit[1];

                intPart = intPart.replace(/[^\d]/g, '');
                if (intPart.length > 3) {
                    var intDiv = Math.floor(intPart.length / 3);
                    while (intDiv > 0) {
                        var lastComma = intPart.indexOf(",");
                        if (lastComma < 0) {
                            lastComma = intPart.length;
                        }

                        if (lastComma - 3 > 0) {
                            intPart = intPart.splice(lastComma - 3, 0, ",");
                        }
                        intDiv--;
                    }
                }

                if (decPart === undefined) {
                    decPart = "";
                }
                else {
                    decPart = "." + decPart;
                }
                var res = intPart + decPart;

                scope.$apply(function () { scope.field = res });

            });
        }
    };
});

app.directive('openMenuByClick', ['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            $(element).click(function (e) {
                e.stopPropagation();
                $("#" + attrs.openMenuByClick).siblings('.dropdown-toggle').trigger('click');
            });
        }
    };
}]);

app.directive('compile', ['$compile', function ($compile) {
    return function (scope, element, attrs) {
        scope.$watch(
            function (scope) {
                return scope.$eval(attrs.compile);
            },
            function (value) {
                element.html(value);
                $compile(element.contents())(scope);
            }
        )
    };
}]);

app.directive('ignoreMouseWheel', function ($rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('mousewheel', function (event) {
                element.blur();
            });
        }
    }
});

app.directive('elemReady', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            elem.ready(function () {
                $scope.$apply(function () {
                    var func = $parse(attrs.elemReady);
                    func($scope);
                })
            })
        }
    }
});

app.directive('comingSoon', ['$dialogAlert', 'CONST_COMMON', function ($dialogAlert, CONST_COMMON) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                $dialogAlert(CONST_COMMON.COMING_SOON_TITLE, CONST_COMMON.COMING_SOON_MESSAGE);
            });
        }
    };
}]);

app.directive('parentNgClick', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                var targetHasClick = false;
                var target = e.target;
                while (!target.parentNode.isEqualNode(element[0]) && !target.isEqualNode(element[0]) && !targetHasClick) {
                    var jqueryEvents = $._data(target, 'events');
                    targetHasClick = typeof target.onclick === 'function' || (jqueryEvents && jqueryEvents.click !== null && jqueryEvents.click !== undefined);
                    target = target.parentNode;
                }
                if (!targetHasClick) {
                    scope.$apply(function () {
                        var func = $parse(attrs.parentNgClick);
                        func(scope);
                    });
                }
            });
        }
    };
});

app.directive('preventParentClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (e) {
                e.stopPropagation();
            });
        }
    };
});

app.directive('fallbackSrc', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
                angular.element(this).attr("width", "100");
                angular.element(this).attr("height", "100");
            });
        }
    };
});

app.directive('imgCenterCroppedFillParent', [
    '$window',
    'MEDIA_QUERY_BP',
    function ($window, MEDIA_QUERY_BP) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                attrs.$set('class', $window.innerWidth >= MEDIA_QUERY_BP.SCREEN_MD ?
                'img-center-cropped-fill-parent-landscape' : 'img-center-cropped-fill-parent-portrait');
            }
        }
}]);

app.directive('textEmphasize', [function() {
    return {
        restrict: 'A',
        scope: {
            textEmphasize: '=textEmphasize'
        },
        link: function(scope, element, attrs) {
            angular.element(document).ready(function () {
                var highlightedHtml = element.html();
                highlightedHtml = highlightedHtml.replace(scope.textEmphasize, '<span class="text-emphasize">' + scope.textEmphasize + '</span>');
                element.html(highlightedHtml);
            });
        }
    }
}]);

app.directive('textBold', [function() {
    return {
        restrict: 'A',
        scope: {
            textBold: '=textBold'
        },
        link: function(scope, element, attrs) {
            if (!scope.textBold || scope.textBold.length == 0) return;
            angular.element(document).ready(function() {
                var html = element.html();
                _.forEach(scope.textBold, function(text) {
                    html = html.replace(text, '<span class="text-bold">' + text + '</span>')
                });
                element.html(html);
            });
        }
    }
}]);

app.directive('autofocus', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element[0].focus();
        }
    };
});

app.directive('gAnalyticsTrackEvent', ['Analytics',
    function (Analytics) {
        return {
            restrict: 'A',
            scope: {
                event: '=gAnalyticsTrackEvent'
            },
            link: function (scope, element, attrs) {
                element.on('click', function(e) {
                    if (scope.event) {
                        Analytics.trackEvent(scope.event.category, scope.event.action, scope.event.label, scope.event.value);
                    }
                });
            }
        }
    }
]);

app.directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A',
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});

app.directive('hirePeople', ['$dialogHirePeople', '$state', 'STATES', function ($dialogHirePeople, $state, STATES) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            el.on('click', function(e) {
                var param;
                try {param = JSON.parse(attrs.hirePeople)}
                catch(e) {console.log(e)}
                //$dialogHirePeople(param);
                $state.go(STATES.GET_STARTED, param);
            });
        }
    };
}]);

app.directive('confirmExit', function() {
    return {
        restrict: 'A',
        scope: {
            confirmExit: '='
        },
        link: function(scope, el, attrs) {
            var confirmationMessage = attrs.confirmationMessage ? attrs.confirmationMessage : 'You have unsaved changes. Are you sure you want to leave this page?';
            window.onbeforeunload = function() {
                if (scope.confirmExit) return confirmationMessage;
            };
            scope.$on('$stateChangeStart', function(event) {
                if (scope.confirmExit && !confirm(confirmationMessage)) {
                    event.preventDefault();
                };
            });
        }
    }
});