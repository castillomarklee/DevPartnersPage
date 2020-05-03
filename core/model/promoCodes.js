'use strict';

app.factory('PromoCodes', [
    '$http',
    'API',
    'ResponseValidator',
    'PromoCode',
    function ($http, API, ResponseValidator, PromoCode) {
        function PromoCodes(data) {
            if (data) {
                this.setData(data);
            }
        }

        PromoCodes.prototype = {
            setData: function(data) {
                angular.extend(this, data);
                if (data.length > 0) {
                    for (var i=0; i<data.length; i++) {
                        data[i] = new PromoCode(data[i]);
                    }
                }
            },
            load: function() {
                var _this = this;
                return $http.get(API.END_POINT + '/Referral/Promos').then(function(response) {
                    if (ResponseValidator.isValid(response)) {
                        _this.setData(response.data.data);
                        return {success: true};
                    } else {
                        return handleError(response);
                    }
                }, function(errorResponse) {
                    return handleError(errorResponse);
                });
            }
        };

        var getDefaultErrorMessage = function(processType) {
            switch (processType) {
                case 'load':
                    return "We were unable to load the list of promo codes. Please try again later.";
            }
        };
        var handleError = function(processType, errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
            } else {
                return {success: false, errorMessage: getDefaultErrorMessage(processType)};
            }
        }

        return PromoCodes;
    }
]);