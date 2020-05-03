$(function () {
  new FontFaceObserver('Lato')
    .load()
    .then(function() {
      document.body.className += " fonts-loaded";
    }, function() {
      console.log('font not available');
      document.body.className += " fonts-loaded";
    });
});