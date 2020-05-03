'use strict';

app.service('MSAuthService', [
    '$q',
    '$localStorage',
    '$rootScope',
    '$http',
    'MSAPI_CONFIG',
    function ($q, $localStorage, $rootScope, $http, MSAPI_CONFIG) {
        function getTKFromLocalStorage() {
            return angular.fromJson(localStorage.getItem('dpcrmmstk'));
        }
        this.init = function () {
            var deferred = $q.defer();
            delete $localStorage.mstk;
            this.clientApp = new Msal.UserAgentApplication(MSAPI_CONFIG.clientId, null, function (errorDesc, token, error, tokenType) {
            }, {
                    redirectUri: MSAPI_CONFIG.redirectUri
                });
            if (this.clientApp.redirectUri) this.clientApp.redirectUri = MSAPI_CONFIG.redirectUri;
            deferred.resolve({ success: true });
            return deferred.promise;
        };

        this.login = function () {
            var _this = this;
            var deferred = $q.defer();
            if (getTKFromLocalStorage()) {
                deferred.resolve({success: true});
            } else {
                _this.tkWatcher = $rootScope.$watch(function () {
                    return getTKFromLocalStorage();
                }, function (newVal, oldVal) {
                    if (newVal) {
                        _this.accessToken = newVal;
                        deferred.resolve({ success: true });
                        _this.tkWatcher();
                    }
                });
                _this.clientApp.loginPopup(MSAPI_CONFIG.graphScopes).then(function (idToken) {
                    _this.clientApp.acquireTokenSilent(MSAPI_CONFIG.graphScopes)
                        .then(function (accessToken) {
                            _this.accessToken = accessToken;
                            $localStorage.mstk = _this.accessToken;
                            deferred.resolve({ success: true });
                        }, function (error) {
                            console.log(error);
                            if (!getTKFromLocalStorage()) {
                                deferred.reject({ success: false, errorMessage: error });
                            } else {
                                if (_this.tkWatcher) _this.tkWatcher();
                                deferred.resolve({success: true});
                            }
                        });
                }, function (error) {
                    deferred.reject({ success: false, errorMessage: error });
                });
            }
            return deferred.promise;
        }

        this.getAccessToken = function() {
            return this.accessToken ? this.accessToken : getTKFromLocalStorage();
        };

        this.release = function() {
            if (this.tkWatcher) this.tkWatcher();
        }
    }]);