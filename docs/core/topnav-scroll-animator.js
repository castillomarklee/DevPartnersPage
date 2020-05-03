$(function () {
  $(document).ready(function() {
    $(document).scroll(function () {
      var $topnav = $(".top-nav");
      var $nav = $topnav.find('nav');
      var $contactLinks = $(".contact-links");
      var $app = $("#app");
      var classFixed;
      if ($topnav.hasClass('top-nav-not-fixed') && !$topnav.hasClass('top-nav-dark')) {
        return;
      }

      if ($topnav.hasClass('top-nav-bright')) {
        classFixed = 'top-nav-bright-fixed';
        $topnav.removeClass('top-nav-fixed');
      } else {
        classFixed = 'top-nav-fixed';
        $topnav.removeClass('top-nav-bright-fixed');
      }
      if ($contactLinks.height() > 0 && !$contactLinks.css('display') == 'none') {
        var threshold = $topnav.height();
        var toggle = $(this).scrollTop() > threshold;
        $topnav.toggleClass(classFixed, toggle);
      } else {
        $topnav.toggleClass(classFixed, $(this).scrollTop() > $nav.height());
        if ($topnav.hasClass('top-nav-fixed')) $topnav.find('.logo').attr('src', 'assets/images/logo-md.png');
        else $topnav.find('.logo').attr('src', 'assets/images/logo-black.png');
      }
      if ($app) {
        $app.toggleClass('app-maximized', $topnav.hasClass(classFixed));
      }
    });
  });
});