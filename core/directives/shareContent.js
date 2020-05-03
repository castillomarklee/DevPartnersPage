'use strict';

app.service('ShareContentService', ['$uibModal', '$window', '$document', function($uibModal, $window, $document) {
    this.shareViaFacebook = function(link) {
        FB.ui({
            method: 'share',
            display: 'popup',
            href: link,
        }, function (response) { });
    };

    this.popupCenter = function (url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = $window.screenLeft != undefined ? $window.screenLeft : screen.left;
        var dualScreenTop = $window.screenTop != undefined ? $window.screenTop : screen.top;

        var width = $window.innerWidth ? $window.innerWidth : $document.documentElement.clientWidth ? $document.documentElement.clientWidth : screen.width;
        var height = $window.innerHeight ? $window.innerHeight : $document.documentElement.clientHeight ? $document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = $window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if ($window.focus) {
            newWindow.focus();
        }
    }
}]);

app.directive('shareViaFacebook', ['ShareContentService', 'FB_ID', function (ShareContentService, FB_ID) {
    return {
        restrict: 'A',
        scope: {
            shareable: '=shareViaFacebook'
        },
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch('shareable', function() {
                if (scope.shareable) {
                    var url = String.format("https://www.facebook.com/dialog/share?app_id={2}&display=popup&href={0}&quote={1}", encodeURIComponent(scope.shareable.link), scope.shareable.summary ? encodeURIComponent(scope.shareable.summary) : '', FB_ID);
                    elem.on('click', function (event) {
                        ShareContentService.popupCenter(url, "Share via Facebook", 550, 420);
                    });
                }
            });
        }
    }
}]);

app.directive('shareViaLinkedIn', ['$location', 'ShareContentService', function ($location, ShareContentService) {
    return {
        restrict: 'A',
        scope: {
            shareable: '=shareViaLinkedIn'
        },
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch('shareable', function() {
                if (scope.shareable) {
                    var url = String.format("https://www.linkedin.com/shareArticle?url={0}&title={1}&summary={2}&source={3}&feature=share", encodeURIComponent(scope.shareable.link), encodeURIComponent(scope.shareable.title), encodeURIComponent(scope.shareable.summary), encodeURIComponent($location.host()));
                    elem.on('click', function (event) {
                        ShareContentService.popupCenter(url, "Share via LinkedIn", 550, 420);
                    });
                }
            });
        }
    }
}]);

app.directive('shareViaTwitter', ['ShareContentService', function (ShareContentService) {
    return {
        restrict: 'A',
        scope: {
            shareable: '=shareViaTwitter'
        },
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch('shareable', function() {
                if (scope.shareable) {
                    var url = String.format("https://twitter.com/intent/tweet?text={0}&via=DevPartnersPH", encodeURIComponent(scope.shareable.summary));
                    elem.on('click', function (event) {
                        ShareContentService.popupCenter(url, "Share via Twitter", 550, 420);
                    });
                }
            });
        }
    }
}]);

app.directive('shareViaEmail', [function() {
    return {
        restrict: 'A',
        scope: {
            shareable: '=shareViaEmail'
        },
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch('shareable', function() {
                if (scope.shareable) {
                    var url = String.format("mailto:?subject={0}&body=Check out this article! {1}",
                        scope.shareable.title, scope.shareable.link);
                    attrs.$set('href', encodeURI(url));
                }
            });
        }
    }
}]);