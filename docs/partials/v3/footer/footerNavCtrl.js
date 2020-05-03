'use strict';

angular.module('app').controller('FooterNavDisplayCtlr', [
    '$window',
    'MEDIA_QUERY_BP',
    'FooterService',
    function ($window, MEDIA_QUERY_BP, FooterService) {
    var vm = this;

    if ($window.innerWidth >= MEDIA_QUERY_BP.SCREEN_MD) {
        vm.servicesExpanded = true;
        vm.aboutExpanded = true;
        vm.connectExpanded = true;
        vm.socialExpanded = true;
    } else {
        vm.servicesExpanded = false;
        vm.aboutExpanded = false;
        vm.connectExpanded = false;
        vm.socialExpanded = false;
    }

    FooterService.getBlog().then(function (response){
        vm.myBlogs = response.data.items;
    })
}]);

angular.module('app').service('FooterService', [
    'API',
    '$http',
    function ($http, API){
        return {
            getBlog : getBlog
        };

        function getBlog(){
            return $http.get(API.END_POINT+ '/Post?orderBy=desc&page=1&perPage=3&sortBy=datePublished&viewType=public')
            .then(function (response){
                return response.data;
            })
        }
    }])