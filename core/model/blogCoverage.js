'use strict';

app.factory('BlogCoverage', [
    '$http',
    '$q',
    'API',
    'Error',
    'ResponseValidator',
    function ($http, $q, API, Error, ResponseValidator) {
        function BlogCoverage(data) {
            if (data) {
                this.setData(data);
            }
        }

        var getMonth = function(monthName) {
            return new Date(Date.parse(monthName + " 1, 2012")).getMonth() + 1;
        };

        BlogCoverage.prototype = {
            setData: function(data) {
                angular.extend(this, data);
                _.forEach(this, function(yearGroup){
                    for (var i = 0; i < yearGroup.month.length; i++) {
                        yearGroup.month[i] = {
                            month: yearGroup.month[i],
                            page: 0,
                            perPage: 4,
                            posts: []
                        };
                    }
                });
            },
            load: function() {
                var _this = this;
                return $http.get(API.END_POINT + '/post/blogcoverage').then(function(response) {
                    if (ResponseValidator.isValid(response)) {
                        _this.setData(response.data.data.coverage);
                        return {success: true};
                    } else {
                        return handleError('load', response);
                    }
                }, function(errorResponse) {
                    return handleError('load', errorResponse);
                });
            },
            loadMonthOfYearPosts: function(month, year) {
                var yearGroup = _.find(this, function(item) {
                    return item.year === year;
                });
                if (yearGroup) {
                    var monthGroup = _.find(yearGroup.month, function(item) {
                        return item.month === month;
                    });
                    var params = {
                        params: {
                            page: monthGroup.page + 1,
                            perPage: monthGroup.perPage,
                            viewType: 'public',
                            sortBy: 'datePublished',
                            orderBy: 'desc',
                            month: getMonth(month),
                            year: year
                        }
                    };
                    return $http.get(API.END_POINT + '/post', params).then(function(response) {
                        if (ResponseValidator.isValid(response)) {
                            monthGroup.posts = monthGroup.posts.concat(response.data.data.items);
                            monthGroup.records = response.data.data.records;
                            monthGroup.page = response.data.data.page;
                            monthGroup.error = undefined;
                            return {success: true};
                        } else {
                            var error = handleError(response);
                            monthGroup.error = new Error({
                                message: error.errorMessage
                            });
                            return error;
                        }
                    }, function(errorResponse) {
                        return handleError(errorResponse);
                    });
                } else {
                    var deferred = $q.defer();
                    setTimeout(function() {
                        deferred.resolve({
                            success: false, errorMessage: getDefaultErrorMessage('loadMonthOfYearPost')
                        })
                    }, 100);
                    return deferred;
                }
            }
        };

        var getDefaultErrorMessage = function(processType) {
            switch(processType) {
                case 'load':
                    return "We were unable to load the archives at the moment. Please try again later.";
                case 'loadMonthOfYearPost':
                    return "We were unable to load the items for the month at the moment. Please try again later.";
            }
        };
        var handleError = function(processType, errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
            } else {
                return {success: false, errorMessage: getDefaultErrorMessage(processType)};
            }
        };

        return BlogCoverage;
    }
]);