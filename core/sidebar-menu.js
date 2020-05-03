function toggleSideMenu(targetMenu) {
  $('#' + targetMenu).toggleClass('anim');
  return false;
};

function toggleNestedMenu(toggle) {
  if(toggle.getElementsByTagName("ul")[0].style.display =="block") {
    $(toggle).find("ul:first").slideUp();
    if ($(toggle).hasClass('active')) {
      $(toggle).toggleClass('active');
    }
  } else {
    $(toggle).children("ul:first").slideDown();
    if (!$(toggle).hasClass('active')) {
      $(toggle).toggleClass('active');
    }
  }

  return false;
};