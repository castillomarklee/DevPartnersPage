

'use strict';

angular.module('app').controller('OurPeopleCtrl', [
    'DevPartnersTeam',
    'MobileChecker',
    'DevPartnersFeaturedTalents',
    '$rootScope',
    function (DevPartnersTeam, MobileChecker, DevPartnersFeaturedTalents, $rootScope) {
        $rootScope.hideNavMenus = false;

        var vm = this;

      
        setTimeout(function(){
            
            vm.dpTeam = DevPartnersTeam.getList();
            vm.talentList = DevPartnersFeaturedTalents.getList();
         }, 0);

      
        vm.isMobile = function() {
            return MobileChecker.isMobileByScreenSize();
        };

        vm.technologies = [
            {
                link: 'assets/img/platforms/asp2.png'
            },
            {
                link: 'assets/img/platforms/sql.png'
            },
            {
                link: 'assets/img/platforms/laravel.png'
            },
            {
                link: 'assets/img/platforms/php.png'
            },
            {
                link: 'assets/img/platforms/mysql.png'
            },
            {
                link: 'assets/img/platforms/html5.png'
            },
            {
                link: 'assets/img/platforms/css3.png'
            },
            {
                link: 'assets/img/platforms/ruby.png'
            },
            {
                link: 'assets/img/platforms/angularjs.png'
            },
            {
                link: 'assets/img/platforms/angular.png'
            },
            {
                link: 'assets/img/platforms/react.png'
            },
            {
                link: 'assets/img/platforms/python.png'
            },
            {
                link: 'assets/img/platforms/django.png'
            },
            {
                link: 'assets/img/platforms/ios.png'
            },
            {
                link: 'assets/img/platforms/android.png'
            },
            {
                link: 'assets/img/platforms/xamarin.png'
            },
            {
                link: 'assets/img/platforms/github.png'
            },
            {
                link: 'assets/img/platforms/svn.png'
            },
            {
                link: 'assets/img/platforms/aws.png'
            },
            {
                link: 'assets/img/platforms/azure.png'
            },
          ];

          $(document).ready(function (){
            $('.slick-responsive').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 3,
                autoplay: true,
                autoplaySpeed: 2500,
                arrows: false,
                // initialSlide: 2,
                responsive: [
                {
                    breakpoint: 1496,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3
                    }
                    },
                  {
                    breakpoint: 1196,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 896,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]
              });
          });
    }
]);