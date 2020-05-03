'use strict';

angular.module('app').controller('ViewBlogCtrl', ['$location', 'BlogEntries', 'BlogCategories', 'MobileChecker',
    function ($location, BlogEntries, Categories, MobileChecker) {
        var vm = this;

        init();

        function init() {
            Categories.getList().then(function(response) {
                if (response.success) {
                    vm.categoryFilters = response.data;
                } else {
                    vm.categoryFilters = [];
                }
                vm.categoryFilters.splice(0, 0, {
                    id: "all",
                    name: "All Post"
                });

                vm.blog.categoryName = vm.categoryFilters[0].name;
                vm.blog.setCategoryFilter(vm.categoryFilters[0].id);
            });

            vm.sortOrders = [{
                    name: "Newest to Oldest",
                    value: "asc"
                }, {
                    name: "Oldest to Newest",
                    value: "desc"
                }
            ];

            vm.blog = new BlogEntries();
            vm.blog.order.orderByName = vm.sortOrders[0].name;
            vm.blog.perPage = 6;
        }

        vm.isMobile = function() {
            return MobileChecker.isMobileByScreenSize();
        };

        vm.initializeList = function() {
            vm.loadPage(1);
        };

        vm.loadSortOrders = function(elementId) {
            var dropdown = angular.element(document.getElementById(elementId));
            if (MobileChecker.isMobile()) {
                dropdown.selectpicker('mobile');
            }
            dropdown.selectpicker('refresh');
            dropdown.selectpicker('render');
        };

        vm.loadPage = function (page) {
            vm.loadingPosts = true;
            vm.blog.getListByPage(page, 'public').then(function (response) {
                vm.loadingPosts = false;
            });
        }

        vm.filterListByCategory = function(category) {
            if (category.id !== vm.blog.categoryId) {
                vm.blog.categoryName = category.name;
                vm.blog.setCategoryFilter(category.id);
                vm.loadPage(1);
            }
            vm.categoryFilterShow = !vm.categoryFilterShow;
        };
        vm.sortList = function(sortBy) {
            if (sortBy && sortBy.value !== vm.blog.order.orderBy) {
                vm.blog.order.orderBy = sortBy.value;
                vm.blog.order.orderByName = sortBy.name;
            }
            vm.loadPage(1);
            vm.sortOrderShow = !vm.sortOrderShow;
        };

        var getShareableLink = function(post) {
            var link = String.format('{0}://{1}/post/{2}', $location.protocol(), $location.host(), post.id);
            return link;
        };
        vm.getShareable = function(post) {
            var link = getShareableLink(post);
            return {
                link: link,
                title: post.postTitle,
                summary: post.subTitle
            };
        };
}]);