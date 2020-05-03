'use strict'

app.service('ProjectTypes', [
    '$http',
    '$sessionStorage',
    '$q',
    'API',
    'ResponseValidator',
    'CONST_COMMON',
    function (
        $http,
        $sessionStorage,
        $q,
        API,
        ResponseValidator,
        CONST_COMMON) {

        this.getList = function (technology) {
            if (technology === $sessionStorage.pt_technology && !_.isEmpty($sessionStorage.pt_list)) {
                var deferred = $q.defer();
                deferred.resolve({success: true, data: $sessionStorage.pt_list});
                return deferred.promise;
            } else {
                return $http.get(API.END_POINT + "/ProjectType", {
                    params: {
                        origin: technology
                    }
                }).then(function (response) {
                    if (ResponseValidator.isValid(response) && response.data.data.projectType && response.data.data.projectType.length > 0) {
                        $sessionStorage.pt_technology = technology;
                        $sessionStorage.pt_list = response.data.data.projectType;
                        return { success: true, data: response.data.data.projectType };
                    } else if (ResponseValidator.isErrorResponseValid(response)) {
                        return { success: false, errorMessage: response.data.error.details };
                    } else {
                        return { success: false, errorMessage: CONST_COMMON.GET_PROJECT_TYPES_FAILED };
                    }
                }, function (errorResponse) {
                    if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                        return { success: false, errorMessage: errorResponse.data.error.details };
                    } else {
                        return { success: false, errorMessage: CONST_COMMON.GET_PROJECT_TYPES_FAILED };
                    }
                });
            }
        };

        this.getProjectType = function (id) {
            return $http.get(API.END_POINT + "/ProjectType/" + id).then(function (response) {
                if (ResponseValidator.isValid(response) && response.data.data.projectType) {
                    return { success: true, data: response.data.data.projectType };
                } else if (ResponseValidator.isErrorResponseValid(response)) {
                    return { success: false, errorMessage: response.data.error.details };
                } else {
                    return { success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE };
                }
            }, function (errorResponse) {
                if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                    return { success: false, errorMessage: errorResponse.data.error.details };
                } else {
                    return { success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE };
                }
            });
        };

        this.getDefaultProjectType = function() {
            if (!_.isEmpty($sessionStorage.pt_list)) {
                var defaultProjectType = _.find($sessionStorage.pt_list, function(item) {
                    return item.isDefault;
                });
                return defaultProjectType ? defaultProjectType.id : $sessionStorage.pt_list[0].id;
            }
        };
    }]);