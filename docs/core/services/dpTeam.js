'use strict';

app.factory('DevPartnersTeam', [
    '$sce',
    'MAPS_KEY',
    'Testimonials',
    'DPTalentPool',
    function ($sce, MAPS_KEY, Testimonials, DPTalentPool) {

        return {
            getList: function () {
                
                return [
                    DPTalentPool.talents.patrick_cameguing,
                    DPTalentPool.talents.arnaldo_ubas,
                    DPTalentPool.talents.inaki_narciso,
                    DPTalentPool.talents.edward_morales,
                    DPTalentPool.talents.arnel_ambrosio,
                ];
            },
            getFrontEndTechnologies: function () {
                return [{
                        name: 'jQuery',
                        logo: 'assets/images/ourpeople/technologies/jquery.png'
                    },
                    {
                        name: 'AngularJS',
                        logo: 'assets/images/ourpeople/technologies/angularjs.png'
                    },
                    {
                        name: 'React',
                        logo: 'assets/images/ourpeople/technologies/react.png'
                    },
                    {
                        name: 'HTML5',
                        logo: 'assets/images/ourpeople/technologies/html5.png'
                    },
                    {
                        name: 'CSS3',
                        logo: 'assets/images/ourpeople/technologies/css3.png'
                    }
                ];
            },
            getBackEndTechnologies: function () {
                return [{
                        name: 'Oracle',
                        logo: 'assets/images/ourpeople/technologies/oracle.png'
                    },
                    {
                        name: 'mongoDB',
                        logo: 'assets/images/ourpeople/technologies/mongodb.png'
                    },
                    {
                        name: 'MySQL',
                        logo: 'assets/images/ourpeople/technologies/mysql.png'
                    },
                    {
                        name: 'Microsoft SQL',
                        logo: 'assets/images/ourpeople/technologies/mssql.png'
                    },
                    {
                        name: 'PostgreSQL',
                        logo: 'assets/images/ourpeople/technologies/postgre.png'
                    },
                    {
                        name: 'ASP.NET',
                        logo: 'assets/images/ourpeople/technologies/aspnet.png'
                    },
                    {
                        name: 'C#',
                        logo: 'assets/images/ourpeople/technologies/csharp.png'
                    },
                    {
                        name: 'php',
                        logo: 'assets/images/ourpeople/technologies/php.png'
                    }
                ];
            },
            getContactPerson: function (country) {
                switch (country) {
                    case "au":
                        return {
                            name: "Peter Chan",
                            avatar: "assets/images/ourpeople/avatars/Peter_Chan.jpg?v=1",
                            email: "peter@devpartners.co",
                            location: "AU Sales Office, Sydney, Australia",
                            mapsUrl: $sce.trustAsResourceUrl("https://maps.googleapis.com/maps/api/staticmap?center=-33.88628,151.19004&zoom=12&size=680x490&maptype=roadmap&markers=-33.88628,151.19004&key=" + MAPS_KEY),
                            description: [
                                "Peter Chan our Sales Consutant is just one call away!",
                                "He is Sydney based, and would be happy to discuss your requirements."
                            ]
                        };
                    case "us":
                        return {
                            name: "Steven Bustin",
                            avatar: "assets/images/ourpeople/avatars/Steven_Bustin.jpg",
                            email: "steven@devpartners.co",
                            contactNum: "+1 415 310 1207",
                            location: "US Sales Office, San Francisco, California, USA",
                            mapsUrl: $sce.trustAsResourceUrl("https://maps.googleapis.com/maps/api/staticmap?center=37.799735,-122.441084&zoom=12&size=680x490&maptype=roadmap&markers=37.799735,-122.441084&key=" + MAPS_KEY),
                            description: [
                                "Steven Bustin our VP Sales, US San Francisco, California.",
                                "He’d love to hear from you more!"
                            ]
                        };
                }
            },
            getAngularJSFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.arnaldo_ubas,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    project: this.getFeaturedProject(country),
                    averageCosting: {
                        heading: 'Average cost of an Angular JS Developer',
                        headingHighlight: 'Angular JS Developer',
                        description: 'The average annual cost of an AngularJS developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring AnjularJS resources with Dev Partners, at no risk.'
                    }
                }
            },
            getASPNetFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.patrick_cameguing,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    project: this.getFeaturedProject(country),
                    averageCosting: {
                        heading: 'Average cost of an ASP.NET Developer',
                        headingHighlight: 'ASP.NET Developer',
                        description: 'The average annual cost of an ASP.NET developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring ASP.NET resources with Dev Partners, at no risk.'
                    }
                };
            },
            getReactJSFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.marie_go,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    project: this.getFeaturedProject(country),
                    averageCosting: {
                        heading: 'Average cost of a ReactJS Developer',
                        headingHighlight: 'ReactJS Developer',
                        description: 'The average annual cost of a ReactJS developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring ReactJS resources with Dev Partners, at no risk.'
                    }
                };
            },
            getRubyFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.inaki_narciso,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    averageCosting: {
                        heading: 'Average cost of a Ruby on Rails Developer',
                        headingHighlight: 'Ruby on Rails Developer',
                        description: 'The average annual cost of a Ruby on Rails developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring Ruby on Rails resources with Dev Partners, at no risk.'
                    }
                };
            },
            getPythonFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.ellen_ortiz,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    averageCosting: {
                        heading: 'Average cost of a Python Developer',
                        headingHighlight: 'Python Developer',
                        description: 'The average annual cost of a Python developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring Python resources with Dev Partners, at no risk.'
                    }
                };
            },
            getLaravelFeaturedContent: function (country) {
                var talent = DPTalentPool.talents.joseph_divino; 
                    talent.position = talent.position.replace('PHP', 'Laravel');
                    talent.experience = talent.experience.replace('PHP', 'Laravel');
                
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: talent,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    averageCosting: {
                        heading: 'Average cost of a Laravel Developer',
                        headingHighlight: 'Laravel Developer',
                        description: 'The average annual cost of a Laravel developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring Laravel resources with Dev Partners, at no risk.'
                    }
                };
            },
            getPHPFeaturedContent: function (country) {
                var talent = DPTalentPool.talents.joseph_divino; 
                    talent.position = talent.position.replace('Laravel', 'PHP');
                    talent.experience = talent.experience.replace('Laravel', 'PHP');
                
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: talent,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    averageCosting: {
                        heading: 'Average cost of a PHP Developer',
                        headingHighlight: 'PHP Developer',
                        description: 'The average annual cost of a PHP developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring PHP resources with Dev Partners, at no risk.'
                    }
                };
            },
            getFullstackFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.randy_famador,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    averageCosting: {
                        heading: 'Average cost of a Fullstack Developer',
                        headingHighlight: 'Fullstack Developer',
                        description: 'The average annual cost of a Fullstack developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring Fullstack Dev resources with Dev Partners, at no risk.'
                    }
                };
            },
            getBackendFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.isagani_quino,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    averageCosting: {
                        heading: 'Average cost of a Backend Developer',
                        headingHighlight: 'Backend Developer',
                        description: 'The average annual cost of a Backend developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring Backend Dev resources with Dev Partners, at no risk.'
                    }
                };
            },
            getFrontendFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.arnaldo_ubas,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    project: this.getFeaturedProject(country),
                    averageCosting: {
                        heading: 'Average cost of a Frontend Developer',
                        headingHighlight: 'Frontend Developer',
                        description: 'The average annual cost of a Frontend developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring Frontend Dev resources with Dev Partners, at no risk.'
                    }
                };
            },
            getMobileFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.mark_agan,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    project: this.getFeaturedProject(country),
                    averageCosting: {
                        heading: 'Average cost of a Mobile Developer',
                        headingHighlight: 'Mobile Developer',
                        description: 'The average annual cost of a Mobile developer is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring Mobile Dev resources with Dev Partners, at no risk.'
                    }
                };
            },
            getQAFeaturedContent: function (country) {
                return {
                    contactPerson: this.getContactPerson(country),
                    talent: DPTalentPool.talents.alex_alipoyo,
                    testimonials: _.slice(Testimonials.getList(), 1),
                    project: this.getFeaturedProject(country),
                    averageCosting: {
                        heading: 'Average cost of a Software Tester',
                        headingHighlight: 'Software Tester',
                        description: 'The average annual cost of a Software Tester is $80-$100,000 US.',
                        savings: 'Save 50-60% hiring QA resources with Dev Partners, at no risk.'
                    }
                };
            },
            getFeaturedTalents: function(filter){
                switch(filter){
                    case 'backend':
                    case 'php':
                    case 'laravel':
                    case 'python':
                        return DPTalentPool.backendTalents();
                    case 'frontend':
                    case 'angularjs':
                    case 'reactjs':
                        return DPTalentPool.frontendTalents();
                    case 'mobile':
                        return DPTalentPool.mobileTalents();
                    case 'quality-assurance':
                        return DPTalentPool.qaTalents();
                    default:
                        return DPTalentPool.fullstackTalents();
                }
            },
            getFeaturedProject: function (country) {
                switch (country) {
                    case "au":
                        return {
                            name: "Loan Market",
                            heading: 'Featured AU Client',
                            logo: "assets/images/home/loanmarket-logo.svg",
                            description: "Loan Market is an AU based company that provides brokers and customers with the tools and software they need to compare loan products and insurance products from the major financial institutions in multiple markets. We assembled an agile team of developers to work together on developing each area of the system. Each team consists of 2 Angular front end developers, 1 database developer and 1 API .net developer. These teams are lead by a scrum master, and supported by designers and testers. The feedback has been excellent and the project is running to time. The software created is industry leading and will assist the business with its growth targets into the future.",
                            highlights: ["2 Angular"]
                        };
                }
            },
            getOffices: function () {
                return [{
                        name: "Davao Philippines Team Office",
                        address: "B401, ACI Tower, J.P. Laurel Avenue cor. Iñigo St., Bajada Davao City",
                        mapsUrl: $sce.trustAsResourceUrl("https://maps.googleapis.com/maps/api/staticmap?center=7.083942, 125.612485&zoom=15&size=600x240&maptype=roadmap&markers=7.083942,125.612485&key=" + MAPS_KEY),
                        contactNum: "082 224 7793"
                    },
                    {
                        name: "Singapore Headquarters",
                        address: "16 Raffles Quay #33-03, Hong Leong Building 048581 Singapore",
                        mapsUrl: $sce.trustAsResourceUrl("https://maps.googleapis.com/maps/api/staticmap?center=16%20Raffles%20Quay%20%2333-03%2C%20Hong%20Leong%20Building%20048581%20Singapore&zoom=15&size=600x240&maptype=roadmap&markers=16%20Raffles%20Quay%20%2333-03%2C%20Hong%20Leong%20Building%20048581%20Singapore&key=" + MAPS_KEY),
                        contactNum: "0800 19 2811"
                    }
                ]
            },
            whatMakesUsExperts: function () {
                return [{
                        title: "Pre-Screened",
                        description: "We meticulously screen all candidates to find the best.",
                        icon: "assets/images/ourpeople/what-makes-us-experts/Prescrenned-icon.svg"
                    },
                    {
                        title: "Quality",
                        description: "We look for experts who are not just talented - but real thinkers that are passionate about what they do.",
                        icon: "assets/images/ourpeople/what-makes-us-experts/Quality-icon.svg"
                    },
                    {
                        title: "Reliability",
                        description: "We take full responsibility for every partner who hires us, ensuring easy and full communication, energy and a positive attitude. We deliver on what we promise.",
                        icon: "assets/images/ourpeople/what-makes-us-experts/Reliability-icon.svg"
                    }
                ]
            }
        };
    }
]);