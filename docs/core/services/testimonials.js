'use strict'

app.service('Testimonials', [function() {
  var service = this;
  service.getList = function() {
    return [
      {
        personName: "Sarah Walters",
        personPosition: "Business Manager Mortgage Direct",
        personAvatar: "assets/images/home/testimonials/Sarah-pic.jpg",
        testimony: "Dev Partners execute the design of our site exactly aligned to our expectations."
      },
      {
        personName: "Chris Brett",
        personPosition: "Operations Manager Awesome Holiday Rentals",
        personAvatar: "assets/images/home/testimonials/Chris-pic.jpg",
        testimony: "They are equipped to handle the task quickly & efficiently.",
        fullTestimony: "Dev Partners offers a unique combination of programming and design experience that enhances the conceptual work we like to concentrate on. Whether we need a technical back-end to be built to support our content, a brand to be extended onto the screen or make it mobile friendly, they are equipped to handle the task quickly & efficiently.",
        companyAvatar: "assets/images/home/awesome_hr-logo.png"
      },
      {
        personName: "James Punnett",
        personPosition: "Head of IT Strategy Loan Market",
        personAvatar: "assets/images/home/testimonials/James-pic.jpg",
        testimony: "We have found Dev Partners to be an excellent partner in this project, they have delivered resources quickly and to a high calibre.",
        fullTestimony: "Our project goal with Dev Partners is to build a CRM system for Mortgage & Insurance brokers in Australia, New Zealand & Indonesia. We have found Dev Partners to be an excellent partner in this project, they have delivered resources quickly and to a high calibre. We have found the staff to be knowledgeable and easy to work with. It is fantastic to have staff located together with a good quality connection and all of the technical tools they need to perform the role. Having visited the office in the Philippines I was impressed with the team environment and the superbly well-equipped office setup.",
        companyAvatar: "assets/images/home/loanmarket-logo.svg"
      }
    ];
  };
  return service;
}]);