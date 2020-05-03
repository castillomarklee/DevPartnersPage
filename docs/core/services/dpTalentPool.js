'use strict';

app.service('DPTalentPool', [
  'DPSkillPool',
  function (DPSkillPool) {
    var vm = this;
    vm.talents = {
      //aspnet
      "patrick_cameguing": {
        avatar: 'assets/images/ourpeople/avatars/backend_dev.jpg?v=@@backend_dev_version',
        firstName: 'Patrick Angelo',
        lastName: 'Cameguing',
        nickname: 'Patrick',
        position: 'Back-end​ Developer',
        location: 'Davao City, Philippines',
        skills: [
          DPSkillPool.skills.aspnet,
          DPSkillPool.skills['c#'],
          DPSkillPool.skills.sql,
          DPSkillPool.skills.mongodb,
        ],
        description: "We’ve been using .NET, MySQL, MongoDB, PostgreSQL on our amazing projects we have in Dev Partners.",
        experience: "Patrick is a senior back-end web developer with over 5 years of experience. He is a master in building back-end for Web applications, he greatly enjoys logic queries and database architecture.",
        wisdom: "In Dev Partners you will see easy-going people but when it comes to work, only then I come to realize how professional these guys are. They always value efficiency and time, have always completed the task right before the deadline which I believe the clients love."
      },
      //angularjs, frontend
      "arnaldo_ubas": {
        avatar: 'assets/images/ourpeople/avatars/frontend_dev.jpg?v=1',
        firstName: 'Arnaldo Jan',
        lastName: 'Ubas',
        nickname: 'Jan-Jan',
        position: 'Angular JS Developer', //Senior ReactJS Developer
        location: 'Davao City, Philippines',
        skills: [
          DPSkillPool.skills.angularjs,
          DPSkillPool.skills.reactjs,
          DPSkillPool.skills.vuejs,
          DPSkillPool.skills.nodejs,
          DPSkillPool.skills.sass,
        ],
        description: "Dev Partners gave me a good working environment which results to better achievement and outcome.",
        experience: "Jan-Jan is a senior Angular JS Developer with over 5 years of experience. He is a master in building front-end for Javascript web applications.",
        wisdom: "Dev Partners is the best software company I have ever been, the working environment is amazing. People despite having different roles click together and enjoy everyone’s company."
      },
      //ruby
      "inaki_narciso": {
        avatar: 'assets/images/ourpeople/avatars/mobile_dev.jpg?v=1',
        firstName: 'Iñaki',
        lastName: 'Narciso',
        nickname: 'Iñaki',
        position: 'Senior OBJECTIVE C,Kotlin Developer',
        location: 'Davao City, Philippines',
        skills: [
          DPSkillPool.skills['objective-c'],
          DPSkillPool.skills.swift,
          DPSkillPool.skills.python,
          DPSkillPool.skills.java,
          DPSkillPool.skills['Kotlin'],
          DPSkillPool.skills['Django'],
          DPSkillPool.skills['SQLite'],
        ],
        experience: "With more than 5 years in software development industry, Iñaki has a reputation in building rocket science apps, he also is a master of Ruby on Rails. He loves risks and usually thinks outside the box.",
        wisdom: "I highly appreciate everyone's drive for excellence here in Dev Partners. People don't settle to what is good, they always aim to what's best. The best for the product. The best for the project. The best for the client. The best for the company. When you get exposed to this kind of culture, you have this inner drive to live up with everyone's expectation. Excellence."
      },
      "edward_morales": {
        avatar: 'assets/images/ourpeople/avatars/uiux_designer.jpg',
        firstName: 'Edward',
        lastName: 'Morales',
        position: '​UI / UX ​Designer',
        location: 'Davao City, Philippines',
        skills: [
          DPSkillPool.skills['adobe-illustrator'],
          DPSkillPool.skills.dreamweaver,
          DPSkillPool.skills.photoshop,
          DPSkillPool.skills.sketch,
        ],
        experience: "Master of user experience and user design, Edward has top of the line mindset on how to deliver the best product to consumers. He has a more than 5 years of experience in graphic design and front end developer.",
        wisdom: "Dev Partners puts an emphasis in creative thinking. People aren't put into a box. People are free to explore elegant solutions to challenging problems, work on projects that matter, and most importantly — people have the freedom to improve upon their skills and talents. This freedom is what inspired my career growth."
      },
      "arnel_ambrosio": {
        avatar: 'assets/images/ourpeople/avatars/project_manager.jpg',
        firstName: 'Arnel',
        lastName: 'Ambrosio',
        position: 'Project Manager',
        location: 'Davao City, Philippines',
        skills: [
          DPSkillPool.skills['project-management'],
          DPSkillPool.skills.scrum,
          DPSkillPool.skills['project-planning'],
        ],
        wisdom: "Dev Partners strictly adheres ‘Work-Life Balance’ by which they value their employees like me as a human being. It always inspires me everyday at work, in return, I always treat clients like a King. Providing them with quality and efficiency outputs."
      },
      //backend
      "isagani_quino": {
        avatar: 'assets/images/ourpeople/avatars/backend_dev5.jpg',
        firstName: 'Isagani',
        lastName: 'Quino',
        nickname: 'Isagani',
        experience: "Isagani has the experience and skill to launch an application using backend technologies from the ground up. He is exceptional in web technologies and makes sure everything is fast and reliable.",
        position: 'Senior Backend Developer',
        skills: [
          DPSkillPool.skills.laravel,
          DPSkillPool.skills.php,
          DPSkillPool.skills.mysql,
        ]
      },
      //reactjs
      "marie_go": {
        avatar: 'assets/images/ourpeople/avatars/frontend_marie_go.jpg',
        firstName: 'Marie Antoinette',
        lastName: 'Go',
        nickname: 'Marie',
        experience: "Marie has a background in software and web development. She's been in the industry for atleast 5 yrs, engaging roles in frontend and backend. She has over a year experience in creating wep app solutions using ReactJs. She's acquainted with other JS frameworks as well like Vue, Angular and Ionic which makes her adapt to other concepts smoothly.",
        position: 'Senior ReactJS Developer',
        skills: [
          DPSkillPool.skills.angularjs,
          DPSkillPool.skills.reactjs,
          DPSkillPool.skills.vuejs,
          DPSkillPool.skills.ionic,
          DPSkillPool.skills.sass,
        ]
      },
      "phebe_sawan": {
        avatar: 'assets/images/ourpeople/avatars/new_pictures/phebe.png',
        firstName: 'Phebe',
        lastName: 'Sawan',
        nickname: 'Phebe',
        experience: "Phebe has a vast experience in Web Development and knowledgeable in various JS Frameworks.",
        position: 'Senior Frontend Developer',
        skills: [
          DPSkillPool.skills.angularjs,
          DPSkillPool.skills.sass,
          DPSkillPool.skills.aspnet,
          DPSkillPool.skills.android,
        ]
      },
      //mobile
      "mark_agan": {
        avatar: 'assets/images/ourpeople/avatars/mobile_mark_agan.jpg',
        firstName: 'Mark',
        lastName: 'Agan',
        nickname: 'Mark',
        experience: "Mark is a graduate of BS Computer Science, he started developing applications using Java since 2012, and then crossed to Android Development using Eclipse and Android Studio. He has also worked on iOS development projects like e - commerce & geo - mapping.",
        position: 'Mobile Developer',
        skills: [
          DPSkillPool.skills.ios,
          DPSkillPool.skills.android,
        ]
      },
      //fullstack
      "randy_famador": {
        avatar: 'assets/images/ourpeople/avatars/backend_dev1.jpg',
        firstName: 'Randy',
        lastName: 'Famador',
        nickname: 'Randy',
        experience: "Meet Randy Famador, full-stack developer, graduate of BS in Information Technology, who has been working in software development since 2013. He loves building logical queries and solving puzzles!",
        position: 'Full-stack Developer',
        skills: [
          DPSkillPool.skills.php,
          DPSkillPool.skills.reactjs,
          DPSkillPool.skills['ruby-on-rails'],
        ]
      },
      //python
      "ellen_ortiz": {
        avatar: 'assets/images/ourpeople/avatars/backend_dev_ellen_ortiz.jpg',
        firstName: 'Ellen',
        lastName: 'Ortiz',
        nickname: 'Ellen',
        experience: "Meet Ellen, Python developer, graduate of BS in Information Technology. She has a wide range of skills and language experience especially in Django. She is one of the most committed developer in Dev Partners to date, and always find ways to make things more efficient on the client and development side.",
        position: 'Python Developer',
        skills: [
          DPSkillPool.skills.python,
          DPSkillPool.skills.django,
        ]
      },
      //laravel, php
      "joseph_divino": {
        avatar: "assets/images/ourpeople/avatars/laravel_dev.jpg?v=@@laravel_dev_version",
        firstName: "Joseph Anthony",
        lastName: "Divino",
        nickname: "Ton-Ton",
        position: "Senior PHP Developer",
        experience: "Ton-Ton has the experience and skill to launch an application using PHP from the ground up. He is exceptional in web technologies and makes sure everything is fast and reliable.",
        skills: [
          DPSkillPool.skills.mysql,
          DPSkillPool.skills.php,
          DPSkillPool.skills.laravel,
        ]
      },
      //quality assurance
      "alex_alipoyo": {
        avatar: 'assets/images/ourpeople/avatars/qa_alex_alipoyo.jpg',
        firstName: 'Alex',
        lastName: 'Alipoyo',
        nickname: 'Alex',
        position: 'Software Tester',
        experience: 'Alex Alipoyo is a software tester with over 5 years of experience in complex systems. He currently is specialized in selenium and blisk. Alex has great passion in perfecting applications, putting a tremendous effort just to make everything right for the users.',
        skills: [
          DPSkillPool.skills['quality-assurance'],
        ],
      },
      "tweeny_megurine": {
        avatar: 'assets/images/ourpeople/avatars/uiux_designer2.jpg?v=@@uiux_designer2_version',
        firstName: 'Tweeny',
        lastName: 'Megurine',
        nickname: 'Tweeny',
        position: 'Ionic Developer and Designer',
        experience: 'Tweeny is a Mobile Developer. Mastered the concept of Javascript, HTML/CSS, Java or Swift, she is able to perform development like Ionic, Android Apps or even iOS apps. She also loves to search for new forms of digital design.',
        skills: [DPSkillPool.skills.ionic]
      }
    };

    function setName(data) {
      data.name = data.firstName + " " + data.lastName;
    }

    function init() {
      for (var key in vm.talents) {
        setName(vm.talents[key]);
      }
    }

    function getFrontendTalents() {
      return [
        vm.talents.arnaldo_ubas,
        vm.talents.marie_go,
        vm.talents.phebe_sawan,
      ];
    }

    function getBackendTalents() {
      return [
        vm.talents.ellen_ortiz,
        vm.talents.inaki_narciso,
        vm.talents.patrick_cameguing,
        vm.talents.isagani_quino,
        vm.talents.randy_famador,
      ];
    }

    function getFullstackTalents() {
      var randomTalents = [],
        talentsKeyTracker = [],
        randomTalentKey;

      //get random 5 talents
      while (randomTalents.length < 5) {
        randomTalentKey = Object.keys(vm.talents)[
          [Math.floor(Math.random() * Object.keys(vm.talents).length)]
        ];

        if (talentsKeyTracker.indexOf(randomTalentKey) < 0) {
          talentsKeyTracker.push(randomTalentKey);
          randomTalents.push(vm.talents[randomTalentKey]);
        }
      }

      return randomTalents;
    }

    function getMobileTalents() {
      return [
        vm.talents.mark_agan,
        vm.talents.tweeny_megurine
      ];
    }

    function getQATalents() {
      return [
        vm.talents.alex_alipoyo
      ];
    }

    function getDevelopers() {
      var devs = angular.extend({}, vm.talents);
      delete devs['arnel_ambrosio'];
      return devs;
    }

    init();

    return {
      talents: vm.talents,
      backendTalents: getBackendTalents,
      frontendTalents: getFrontendTalents,
      fullstackTalents: getFullstackTalents,
      mobileTalents: getMobileTalents,
      qaTalents: getQATalents,
      developers: getDevelopers
    }
  }
]);