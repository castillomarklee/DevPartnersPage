'use strict'

app.factory('LeadContact', ['$http', '$sanitize', 'API', 'ResponseValidator', 'AuthService', 'CONST_COMMON',
    function ($http, $sanitize, API, ResponseValidator, AuthService, CONST_COMMON) {
        function LeadContact(leadContactData) {
            if (leadContactData) {
                this.setData(leadContactData);
            }
        };

        LeadContact.prototype = {
            setData: function (leadContactData) {
                angular.extend(this, leadContactData);
            },
            save: function () {
                var contact = this;
                contact.fullName = $sanitize(contact.fullName);
                contact.organizationName = $sanitize(contact.organizationName);
                contact.state = $sanitize(contact.state);
                contact.email = $sanitize(contact.email);
                contact.phone = $sanitize(contact.phone);
                contact.message = $sanitize(contact.message);
                return AuthService.getAntiForgeryToken().then(function (response) {
                    if (response.success) {
                        return $http.post(API.END_POINT + "/leadContact", contact).then(function (response) {
                            if (ResponseValidator.isValid(response) && response.data.data) {
                                return { success: true, data: response.data };
                            } else {
                                return handleError('save', response);
                            }
                        }, function (errorResponse) {
                            return handleError('save', errorResponse);
                        });
                    } else {
                        return handleError('save');
                    }
                });
            },
            load: function (id) {
                var scope = this;
                return $http.get(API.END_POINT + "/leadContact/" + id).then(function (response) {
                    if (ResponseValidator.isValid(response) && response.data.data.lead) {
                        scope.setData(response.data.data.lead);
                        return { success: true };
                    } else {
                        return handleError('load', response);
                    }
                }, function (errorResponse) {
                    return handleError('load', errorResponse);
                });
            },
            update: function () {
                return $http.put(API.END_POINT + "/leadContact", this).then(function (response) {
                    if (ResponseValidator.isValid(response)) {
                        return { success: true, data: response.data };
                    } else {
                        return handleError('update', response);
                    }
                }, function (errorResponse) {
                    return handleError('update', response);
                });
            },
            track: function () {
                var _this = this;
                return AuthService.getAntiForgeryToken().then(function(response) {
                    if (response.success) {
                        return $http.post(API.END_POINT + '/LeadContact/MailChimpLead', {
                            email: $sanitize(_this.email),
                            fullName: $sanitize(_this.fullName),
                            company: $sanitize(_this.organizationName)
                        }).then(function (response) {
                            if (ResponseValidator.isValid(response)) {
                                return { success: true };
                            } else {
                                return handleError('track', response);
                            }
                        }, function (errorResponse) {
                            return handleError('track', errorResponse);
                        });
                    } else {
                        return handleError('track');
                    }
                });
            }
        };

        var handleError = function(operation, errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
            } else {
                return {success: false, errorMessage: getDefaultErrorMessage(operation)};
            }
        };
        var getDefaultErrorMessage = function(operation) {
            switch (operation) {
                case 'save':
                case 'load':
                case 'update':
                    return CONST_COMMON.GENERIC_ERROR_MESSAGE;
                case 'track':
                    return 'Unable to send the lead\'s info.';
            }
        };

        return LeadContact;
    }]);