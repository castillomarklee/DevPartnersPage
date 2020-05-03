'use strict';

app.factory('Referral', [
    '$http',
    'API',
    'ResponseValidator',
    'AuthService',
    '$sanitize',
    '$location',
    function ($http, API, ResponseValidator, AuthService, $sanitize, $location) {

        function Referral(data) {
            if (data) {
                this.setData(data);
            }
        }

        Referral.prototype = {
            setData: function(data) {
                angular.extend(this, data);
                this.shareable = {};
                var _this = this;
                _.forEach(['fb', 'twitter', 'linkedin'], function(sharePlatform) {
                    _this.shareable[sharePlatform] = {
                        link: _this.referrerLink,
                        title: "RECEIVE A 20% DISCOUNT",
                        summary: _this.getDefaultShareMessage(sharePlatform)
                    };
                });
            },
            save: function() {
                var _this = this;
                _this.firstName = $sanitize(_this.firstName);
                _this.lastName = $sanitize(_this.lastName);
                _this.email = $sanitize(_this.email);
                return AuthService.getAntiForgeryToken().then(function(response) {
                    if (response.success) {
                        return $http.post(API.END_POINT + '/Referral/Referrer', _this).then(function (response) {
                            if (ResponseValidator.isValid(response)) {
                                _this.setData(response.data.data);
                                return { success: true };
                            } else {
                                return handleError('save', response);
                            }
                        }, function (errorResponse) {
                            return handleError('save', errorResponse);
                        });
                    } else {
                        return {success: false, errorMessage: getDefaultErrorMessage('save')};
                    }
                });
            },
            shareViaEmail: function(sendFrom, sendTo, promocode, message) {
                var _this = this;
                return AuthService.getAntiForgeryToken().then(function(response) {
                    if (response.success) {
                        return $http.post(API.END_POINT + "/Referral/ShareViaEmail", {
                            sendFrom: $sanitize(sendFrom),
                            sendTo: $sanitize(sendTo.replace(/\s/, '')),
                            promoCode: $sanitize(promocode),
                            referrerCode: $sanitize(_this.referrerCode),
                            isSelfReferred: _this.isSelfReferred,
                            hasNewsLetter: _this.hasNewsLetter,
                            customizeMessage: $sanitize(message)
                        }).then(function (response) {
                            if (ResponseValidator.isValid(response)) {
                                return { success: true, data: response.data.data };
                            } else {
                                return handleError('shareViaEmail', response);
                            }
                        }, function (errorResponse) {
                            return handleError('shareViaEmail', errorResponse);
                        });
                    } else {
                        return {success: false, errorMessage: getDefaultErrorMessage('save')};
                    }
                });
            },
            getDefaultShareMessage: function(sharePlatform) {
                switch(sharePlatform) {
                    case 'fb':
                        return undefined;
                    case 'twitter':
                        return String.format("Receive a 20% discount on your 1st contract when you hire our expert devs & VAs today via: {0}", this.referrerLink);
                    case 'linkedin':
                        return String.format("Receive a 20% discount on your 1st contract when you hire our expert devs & VAs today via: {0}", this.referrerLink);
                }
            }
        };

        var getDefaultErrorMessage = function(processType) {
            switch(processType) {
                case 'save':
                    return "We were unable to create a referral code for you. Please try again later or contact us to address the issue.";
                case 'shareViaEmail':
                    return "We were unable to share your referral. Please try again later or contact us to address the issue.";
            }
        }
        var handleError = function(processType, errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
            } else {
                return {success: false, errorMessage: getDefaultErrorMessage(processType)};
            }
        }

        return Referral;
}]);