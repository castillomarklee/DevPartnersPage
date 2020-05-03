'use strict';

app.factory('Referrals', [
    '$http',
    '$q',
    'API',
    'ResponseValidator',
    'Referral',
    'List',
    function(
        $http,
        $q,
        API, 
        ResponseValidator,
        Referral,
        List
    ) {
        function Referrals(data) {
            if(data) {
                this.setData(data);
            }
        }

        angular.extend(Referrals.prototype, List.prototype);

        var perPage = 20;
        
        Referrals.prototype.filters = {};

        Referrals.prototype.setData = function (data) {
            if (data.items && data.items.length > 0) {
                for (var i = 0; i < data.items.length; i++) {
                    data.items[i] = new Referral(data.items[i]);
                }
            }
            angular.extend(this, data);
        };

        Referrals.prototype.getListByPage = function (page) {
            var _this = this;
            var params = {
                params: {
                    page: page,
                    perPage: perPage
                }
            };

            if (_this.filters) {
                if (_this.filters.dateStart) params.params.dateStart = _this.filters.dateStart;
                if (_this.filters.dateEnd) params.params.dateEnd = _this.filters.dateEnd;
            }

            if (_this.sortBy) params.params.sortBy = _this.sortBy;
            if (_this.orderBy) params.params.orderBy = _this.orderBy;

            return $http.get(API.END_POINT + '/referral/referrerList', params).then(function (response) {
                if (ResponseValidator.isValid(response)) {
                    _this.setData(response.data.data);
                    return { success: true };
                } else {
                    return handleError(response);
                }
            }, function (errorResponse) {
                return handleError(errorResponse);
            });
        };

        Referrals.prototype.report = function (emails) {
            var promises = [];
            var _this = this;
            _.each(emails, function (email) {
                var params = { params: {} };

                if (_this.filters) {
                    if (_this.filters.dateStart) params.params.dateStart = _this.filters.dateStart;
                    if (_this.filters.dateEnd) params.params.dateEnd = _this.filters.dateEnd;
                }

                if (_this.sortBy) params.params.sortBy = _this.sortBy;
                if (_this.orderBy) params.params.orderBy = _this.orderBy;
                params.params.email = email;

                var currentPromise = $http.get(API.END_POINT + '/referral/referrerList', params);
                promises.push(currentPromise);
            });

            return $q.all(promises).then(function (responses) {
                var failedEmails = [];
                _.each(responses, function (response) {
                    if (!ResponseValidator.isValid(response)) {
                        failedEmails.push(response.config.params.email);
                    }
                });

                if (failedEmails.length === 0) {
                    return { success: true };
                } else {
                    return handleError(undefined, 'report', _.join(failedEmails, ', '));
                }
            }, function (errorResponse) {
                return handleError(errorResponse, 'report');
            });
        };

        function handleError(errorResponse, process, defaultMessageArgs) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return { success: false, errorMessage: errorResponse.data.error.details };
            } else {
                return { success: false, errorMessage: getDefaultErrorMessage(process, defaultMessageArgs) };
            }
        }

        function getDefaultErrorMessage(process, defaultMessageArgs) {
            switch (process) {
                case 'getListByPage':
                    return 'Unable to get the list of referrals.';
                case 'report':
                    return 'Unable to send referral reports to the ff recipients: ' + defaultMessageArgs;
            }
        }

        return Referrals;
    }
]);