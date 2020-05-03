'use strict'

app.service('MockCategories', ['$q', function ($q) {
  this.getList = function () {
    var deferred = $q.defer();
    setTimeout(function () {
      deferred.resolve({
        success: true,
        data: [{
          id: '1',
          code: 'news',
          name: 'News'
        },
        {
          id: '2',
          code: 'services',
          name: "Services"
        },
        {
          id: '3',
          code: 'outsourcing',
          name: "Outsourcing"
        },
        {
          id: '4',
          code: 'technology',
          name: "Technology"
        },
        {
          id: '5',
          code: 'virtualAssistance',
          name: "Virtual Assistance"
        },
        {
          id: '6',
          code: 'softwareDevelopment',
          name: "Software Development"
        },
        {
          id: '7',
          code: 'recruitment',
          name: "Recruitment"
        },
        {
          id: '8',
          code: 'testimonial',
          name: "Testimonial"
        }
      ]
      });
    }, 1000);

    return deferred.promise;
  };
}]);