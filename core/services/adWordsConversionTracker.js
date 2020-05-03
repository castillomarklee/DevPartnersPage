'use strict';

app.service('AdWordsConversionTracker', [
    function() {
        var tags = function (category) {
            switch(category) {
                case 'reactjsus_camp1':
                case 'reactjsau_camp1':
                    return {
                        id: 871006878,
                        requestQuote: {
                            label: 't7l0COLzrnUQnoWqnwM'
                        },
                        scheduleCall: {
                            label: 'fd9cCPfdtHUQnoWqnwM'
                        },
                        proceedQuote: {
                            label: 'o3eECPLhtHUQnoWqnwM'
                        }
                    };
                    break;
                case 'laravelus_camp1':
                case 'laravelau_camp1':
                    return {
                        id: 871006878,
                        requestQuote: {
                            label: 'VuswCJvssnUQnoWqnwM'
                        },
                        scheduleCall: {
                            label: 'BYnYCK7qsnUQnoWqnwM'
                        },
                        proceedQuote: {
                            label: 'a_FwCLzssnUQnoWqnwM'
                        }
                    };
                    break;
                case 'aspnetus_camp1':
                case 'aspnetau_camp1':
                    return {
                        id: 871006878,
                        requestQuote: {
                            label: 'JXs8CMjcuHUQnoWqnwM'
                        },
                        scheduleCall: {
                            label: 'cpfXCLnssnUQnoWqnwM'
                        },
                        proceedQuote: {
                            label: 'cnsHCObfuHUQnoWqnwM'
                        }
                    };
                    break;
                case 'rubyus_camp1':
                case 'rubyau_camp1':
                    return {
                        id: 871006878,
                        requestQuote: {
                            label: 'MEjDCJ7MoHUQnoWqnwM'
                        },
                        scheduleCall: {
                            label: 'G4ofCPnNoHUQnoWqnwM'
                        },
                        proceedQuote: {
                            label: 'wcyZCL_MoHUQnoWqnwM'
                        }
                    };
                    break;
            }
        };

        this.reportConversion = function (category, action, value, currencyCode) {
            var categoryConfig = tags(category);
            if (!categoryConfig) return;
            var action = categoryConfig[action];
            if (!action) return;

            window.google_conversion_id = categoryConfig.id;
            window.google_conversion_label = action.label;
            window.google_conversion_value = value;
            window.google_conversion_currency = currencyCode;
            window.google_remarketing_only = false;
            window.google_conversion_format = "3";
            var opt = new Object();
            opt.onload_callback = function () {
                if (typeof (url) != 'undefined') {
                    window.location = url;
                }
            }
            var conv_handler = window['google_trackConversion'];
            if (typeof (conv_handler) == 'function') {
                conv_handler(opt);
            }
        };
    }
]);