'use strict';

angular.module('app').controller('FrontEndDevCtrl', [
    'DevPartnersTeam',
    function (DevPartnersTeam) {
        var vm = this;
        vm.frontEndDeveloper = DevPartnersTeam.getFrontEndDev();
        vm.technologies = DevPartnersTeam.getFrontEndTechnologies();
    }
]);