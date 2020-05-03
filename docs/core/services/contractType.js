'use strict';

app.service('ContractType', [
    '$http',
    '$sessionStorage',
    '$q',
    'API',
    'ResponseValidator', function ($http, $sessionStorage, $q, API, ResponseValidator) {

        this.getList = function() {
            if ($sessionStorage.contractType && $sessionStorage.contractType.length > 0) {
                var deferred = $q.defer();
                deferred.resolve({success: true, data: $sessionStorage.contractType});
                return deferred.promise;
            } else {
                return $http.get(API.END_POINT + '/contracttype').then(function(response) {
                    if (ResponseValidator.isValid(response)) {
                        $sessionStorage.contractType = response.data.data.contractType;
                        return { success: true, data: response.data.data.contractType};
                    } else {
                        return handleError(response);
                    }
                }, function(errorResponse) {
                    return handleError(errorResponse);
                });
            }
        };

        this.isFulltime = function(contractTypeId) {
            return contractTypeId === '6a5dae59-965f-e711-b1d9-02008b08a94b';
        };

        this.getContractType = function(contractTypeId) {
            if ($sessionStorage.contractType) {
                return $sessionStorage.contractType.find(function(element) {
                    return element.id === contractTypeId;
                });
            }
        };

        var handleError = function(errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
            } else {
                return {success: false, errorMessage: 'Unable to get the list of contract types.'};
            }
        };
}]);