'use strict';

app.service('Page', [function() {

    angular.extend(this, {
        title: 'Dev Partners',//default
        description: 'Your Reliable Outsourcing Partner' //default
    });

    this.setPageTitle = function(title) {
        this.title = title;
    };

    this.setDescription = function(description) {
        this.description = description;
    };
}]);