'use strict';

app.service('DevPartnersFeaturedTalents', [
  function() {
    this.talents = [
      {
        name: 'Phebe Sawan',
        avatar: 'assets/images/ourpeople/avatars/new_pictures/phebee_new.jpg',
        avatar_smaller: 'assets/images/ourpeople/avatars/our_teampix/phebe.jpg',
        skill: 'AngularJS',
        landing: 'angularjs',
        description:
          'Sr. Frontend Developer with over 6 years experience. Expert in AngularJS, Javascript, JQuery and CSS3/HTML5.',
        otherSkills: ['Javascript', 'JQuery', 'CSS/HTML', 'Java for Android'],

        specialization: ['frontend', 'fullstack']
      },
      {
        name: 'Deane Goyagoy',
        avatar: 'assets/images/ourpeople/avatars/new_pictures/deane.jpg',
        avatar_smaller: 'assets/images/ourpeople/avatars/our_teampix/deane.png',
        skill: 'ASP.NET',
        landing: 'aspnet',
        description:
          'Sr. NET Developer specializing in web development using ASP.NET MVC 5. Adept with frontend technologies like Razor (.NET) and AngularJS.',
        otherSkills: ['ASP.NET MVC', 'WebAPI', 'WCF', 'Razor', 'AngularJS'],
        specialization: ['frontend', 'backend', 'fullstack']
      },
      {
        name: 'Jan Ubas',
        avatar: 'assets/images/ourpeople/avatars/new_pictures/jan_jan.jpg',
        avatar_smaller: 'assets/images/ourpeople/avatars/our_teampix/jan2.jpg',
        skill: 'AngularJS',
        landing: 'reactjs',
        description:
          'Expert developer with experience in multiple technology stacks such as PHP, Laravel, ASP.NET MVC, ReactJS, AngularJS and Cordova for mobile.',
        otherSkills: [
          'PHP',
          'FuelPHP',
          'Laravel',
          'ASP.NET MVC',
          'ReactJS',
          'Ionic',
          'Cordova'
        ],
        specialization: ['frontend']
      },
      {
        name: 'Randy Famador',
        avatar: 'assets/images/ourpeople/avatars/new_pictures/Randy_new.jpg',
        avatar_smaller: 'assets/images/ourpeople/avatars/our_teampix/randy.jpg',
        skill: 'MSSQL',
        landing: 'fullstack',
        description:
          'Over 5 years experience in full stack development. Extensive experience in ASP.NET, ASP.NET MVC, SQL Server, MySQL, JQuery, AJAX, Bootstrap, CSS/HTML',
        otherSkills: [
          'ASP.NET',
          'ASP.NET MVC',
          'SQL Server',
          'MySQL',
          'CSS/HTML'
        ],
        specialization: ['backend', 'fullstack']
      },
      {
        name: 'John Dormitorio',
        avatar: 'assets/images/ourpeople/avatars/new_pictures/John.jpg',
        avatar_smaller: 'assets/images/ourpeople/avatars/our_teampix/dorms.jpg',
        skill: 'ASP.NET',
        landing: 'backend',
        description:
          'Expert API and database developer with over 5 years experience. Solid knowledge in .NET technologies.',
        otherSkills: [
          'ASP.NET MVC 5',
          '.NET Core',
          'Entity Framework',
          'SQL Server'
        ],
        specialization: ['backend']
      },
      {
        name: 'Bobby Gemong',
        avatar: 'assets/images/ourpeople/avatars/new_pictures/Bob.jpg',
        avatar_smaller: 'assets/images/ourpeople/avatars/our_teampix/bob.jpg',
        skill: 'AngularJS',
        landing: 'freelance',
        description:
          'Sr. Frontend Developer with proven experience in AngularJS, Javascript, HTML/CSS/SaSS.',
        otherSkills: [
          'AngularJS',
          'Angular',
          'Javascript',
          'Bootstrap',
          'Jquery',
          'CSS',
          'HTML',
          'SaSS'
        ],
        specialization: ['frontend', 'backend', 'fullstack']
      },
      {
        name: 'Marie Go',
        avatar: 'assets/images/ourpeople/avatars/new_pictures/marie_new.jpg',
        avatar_smaller: 'assets/images/ourpeople/avatars/our_teampix/marie.jpg',
        skill: 'ReactJS',
        landing: 'freelance',
        description:
          'Sr. Frontend Developer with proven experience in AngularJS, ReactJS, BackboneJS, HTML/CSS/SaSS. Solid working experience in PHP Laravel',
        otherSkills: [
          'AngularJS',
          'VueJS',
          'BackboneJS',
          'JQuery',
          'Javascript'
        ],
        specialization: ['frontend', 'fullstack']
      },
      {
        name: 'Glory Jean Buaya',
        avatar: 'assets/images/ourpeople/avatars/new_pictures/glory_new.jpg',
        avatar_smaller: 'assets/images/ourpeople/avatars/our_teampix/glory.jpg',
        skill: 'QA',
        landing: 'quality-assurance',
        description:
          'Detail-oriented Quality Assurance Analyst with vast experience in manual and automated testing.',
        otherSkills: [
          'UAT',
          'Functional Testing',
          'Integration Testing',
          'JIRA'
        ],
        specialization: ['quality-assurance']
      },
      {
        name: 'Tweeny Megurine',
        avatar:
          'assets/images/ourpeople/avatars/uiux_designer2.jpg?v=@@uiux_designer2_version',
        skill: 'Ionic',
        landing: 'mobile',
        specialization: ['mobile']
      },
      {
        name: 'Ellen Ortiz',
        avatar: 'assets/images/ourpeople/avatars/backend_dev_ellen_ortiz.jpg',
        skill: 'Python',
        landing: 'python',
        specialization: ['frontend', 'backend', 'fullstack']
      },
      {
        name: 'Roland Baro',
        avatar: 'assets/images/ourpeople/avatars/backend_dev_roland_baro.jpg',
        skill: 'MSSQL',
        landing: 'backend',
        specialization: ['backend']
      },
      {
        name: 'Joseph Baron',
        avatar: 'assets/images/ourpeople/avatars/backend_dev4.jpg',
        skill: 'Python',
        landing: 'python',
        specialization: ['backend']
      },
      {
        name: 'Isagani Quino',
        avatar: 'assets/images/ourpeople/avatars/backend_dev5.jpg',
        skill: 'Laravel',
        landing: 'laravel',
        specialization: ['frontend', 'backend', 'fullstack']
      },
      {
        name: 'Alex Alipoyo',
        avatar: 'assets/images/ourpeople/avatars/qa_alex_alipoyo.jpg',
        skill: 'QA',
        landing: 'quality-assurance',
        description:
          'Detail-oriented Quality Assurance Analyst with vast experience in manual and automated testing.',
        specialization: ['quality-assurance']
      },
      {
        name: 'Patrick  Quino',
        avatar: 'assets/images/ourpeople/avatars/backend_dev.jpg',
        skill: 'ASP.NET',
        landing: 'aspnet',
        specialization: ['backend']
      }
    ];

    this.getList = function(specialization) {
      if (!specialization) return this.talents;

      return _.reduce(
        this.talents,
        function(result, value) {
          value.specialization.includes(specialization) && result.push(value);

          return result;
        },
        []
      );
    };
  }
]);
