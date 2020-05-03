'use strict';

app.factory('PromoCode', [
    '$http',
    'API',
    'ResponseValidator', function($http, API, ResponseValidator) {

        function PromoCode(data) {
            if (data) {
                this.setData(data);
            }
        }

        PromoCode.prototype = {
            setData: function(data) {
                angular.extend(this, data);
            },
            load: function(location) {
                var _this = this;
                return $http.get(API.END_POINT + '/Referral/PromoCode', {
                    params: {
                        PromoCode: this.promoCode || this.subPromoCode,
                        Location: location
                    }
                }).then(function(response) {
                    if (ResponseValidator.isValid(response)) {
                        _this.setData(response.data.data);
                        return {success: true};
                    } else {
                        return handleError('load', response);
                    }
                }, function(errorResponse){
                    return handleError('load', errorResponse);
                });
            },
            clear: function(completely) {
                this.id = undefined;
                if (completely) this.promoCode = undefined;
                this.subPromoCode = undefined;
                this.location = undefined;
                this.discount = undefined;
                this.isPercentage = undefined;
                this.expiryDate = undefined;
                this.isActive = undefined;
            }
        };

        var getDefaultErrorMessage = function(processType) {
            switch(processType) {
                case 'load':
                    return 'The promo code is invalid.';
            }
        };
        var handleError = function(processType, errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
            } else {
                return {success: false, errorMessage: getDefaultErrorMessage(processType)};
            }
        };

        return PromoCode;
    }
]);