'use strict'

app.service('CoreServices', ['STATES', function(STATES){
  return {
    getList: function() {
      return [
        {
          title: "Software Development",
          coverImg: {
            small: "assets/images/services/Software Development Cover_small.jpg",
            medium: "assets/images/services/Software Development Cover.jpg"
          },
          logo: "assets/images/services/Soft-Dev-icon-active.svg",
          logoFeatured: "assets/images/services/Soft-Dev-icon2.svg",
          page: STATES.SOFTWARE_DEVELOPMENT,
          description: "Our Bread & Butter. Our Masterpiece.",
          hero: {
            avatar: "assets/images/services/heroes/software-dev-hero.jpg?v=1",
            description: "We pride ourselves in delivering skills and integrity, gathering top software developers to build the right team for your project."
          }
        },
        {
          title: "UI/UX Design Strategy",
          coverImg: {
            small: "assets/images/services/UIUX Design Strategy Cover_small.jpg",
            medium: "assets/images/services/UIUX Design Strategy Cover.jpg"
          },
          logo: "assets/images/services/UX-UI-icon-active.svg",
          logoFeatured: "assets/images/services/UX-UI-icon2.svg",
          page: STATES.UIUX_DESIGN_STRATEGY,
          description: "Intuitive Design. Interface Rockstars.",
          hero: {
            description: "Our design engineers are meticulous and passionate in every way, but we carefully hand-picked them so we know you get the thoroughness, professionalism and ultimately the creativity."
          }
        },
        {
          title: "Product Management",
          coverImg: {
            small: "assets/images/services/Product Management Cover_small.jpg",
            medium: "assets/images/services/Product Management Cover.jpg"
          },
          page: STATES.PRODUCT_MANAGEMENT,
          description: "Defining Products. Exceptional Delivery."
        },
        {
          title: "Virtual Assistant Support",
          coverImg: {
            small: "assets/images/services/Virtual Assistance Cover_small.jpg",
            medium: "assets/images/services/Virtual Assistance Cover.jpg"
          },
          page: STATES.REMOTE_ADMIN_MANAGEMENT,
          description: "Micro Tasks. Remotely new perspective. Get on top of your bigger dreams."
        }
      ]
    }
  };
}]);