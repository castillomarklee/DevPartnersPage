'use strict'

app.service('YoutubeAsyncLoader', ['$sce', 'MobileChecker', function ($sce, MobileChecker) {
  var service = this;
  service.load = function(identifier) {
    var youtubeVids = document.querySelectorAll(identifier);
    for (var i = 0; i < youtubeVids.length; i++) {
      if (!MobileChecker.isMobile()) {
        // thumbnail image source.
        var source = $sce.trustAsResourceUrl("https://img.youtube.com/vi/" + youtubeVids[i].dataset.embed + "/sddefault.jpg");
        // load the image asynchronously
        var thumbContainer = document.createElement('div');
        thumbContainer.className = 'yt-thumbnail';
        var image = new Image();
        image.src = source;
        thumbContainer.appendChild(image);
        image.addEventListener("load", function () {
          youtubeVids[i].appendChild(thumbContainer);
        }(i));
        // attach the click listener to play the actual vid
        youtubeVids[i].addEventListener("click", function () {
          service.appendVideo(this);
        });
      } else {
        service.appendVideo(youtubeVids[i]);
      }
    }
  };

  service.appendVideo = function(youtubeHolder) {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("src", $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + youtubeHolder.dataset.embed + "?rel=0&showinfo=0&autoplay=1"));
    youtubeHolder.innerHTML = "";
    youtubeHolder.appendChild(iframe);
  };

  return this;
}]);