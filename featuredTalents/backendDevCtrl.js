'use strict';

angular.module('app').controller('BackEndDevCtrl', [
    'DevPartnersTeam',
    function (DevPartnersTeam) {
        var vm = this;
        vm.developer = DevPartnersTeam.getBackEndDev();
        vm.technologies = DevPartnersTeam.getBackEndTechnologies();
    }
]);