/* utilities, helper functions*/
'use strict';

app.factory('RandIntInclusive', function () {
    return function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
});

app.factory('RoleImg', ['RandIntInclusive', 'CONST_TEAM', function (RandIntInclusive, CONST_TEAM) {
    return function (index) {
        if (index < CONST_TEAM.ROLE_IMGS.length) {
            return CONST_TEAM.ROLE_IMGS[index];
        } else {
            var validIndex = index % CONST_TEAM.ROLE_IMGS.length;
            return CONST_TEAM.ROLE_IMGS[validIndex];
        }
    };
}]);

app.factory('ResponseValidator', function (CONST_COMMON) {
    return {
        isValid: function (response) {
            return response && response.data && response.data.data || this.isSuccess(response) || response.data.result;
        },
        isSuccess: function (response) {
            return response && response.data && response.data.status && response.data.status === CONST_COMMON.STATUS_SUCCESS;
        },
        isErrorResponseValid: function (errorResponse) {
            return errorResponse && errorResponse.data && errorResponse.data.error && errorResponse.data.error.details && errorResponse.data.error.details.trim() !== '';
        }
    };
});

app.provider('MobileChecker', [function MobileChecker() {

    this.isMobile = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    this.isMobileByScreenSize = function () {
        return window.innerWidth < 992;
    };

    this.isTinyMobileByScreenSize = function () {
        return window.innerWidth < 768;
    };

    this.$get = [function mobileCheckerFactory() {
        return new MobileChecker();
    }];
}]);

app.factory('Numbers', function () {
    return {
        decimalAdjust: function (type, value, exp) {
            // If the exp is undefined or zero...
            if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
            }
            value = +value;
            exp = +exp;
            // If the value is not a number or the exp is not an integer...
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
            }
            // If the value is negative...
            if (value < 0) {
                return -this.decimalAdjust(type, -value, exp);
            }
            // Shift
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
            // Shift back
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
        },
        round10: function (number, exp) {
            return this.decimalAdjust('round', number, exp);
        }
    };
});

app.service('PopupWindow', ['$window', function ($window) {
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
    };
}]);

app.service('DependenciesLoader', ['$ocLazyLoad', '$q', function($ocLazyLoad, $q) {
    this.load = function() {
        var filesArray = [];
        _.each(arguments, function(item) {
            if (_.isArray(item)) filesArray = _.union(filesArray, item);
            else filesArray.push(item);
        });

        var deferred = $q.defer();
        var filesCount = filesArray.length;

        var loadFiles = function (files) {
            var file = files.splice(0, 1)[0];
            $ocLazyLoad.load(file).then(function (response) {
                if (files.length > 0) loadFiles(files);
                else deferred.resolve({ success: true });
            });
        }
        loadFiles(filesArray);

        return deferred.promise;
    }
}]);

app.factory('AdCodeTechnology', function() {
    return function (adCode) {
        if (!adCode) return;
        if (adCode.indexOf('aspnet') != -1) return 'aspnet';
        else if (adCode.indexOf('laravel') != -1) return 'laravel';
        else if (adCode.indexOf('reactjs') != -1) return 'reactjs';
        else if (adCode.indexOf('ruby') != -1) return 'ruby';
    };
});