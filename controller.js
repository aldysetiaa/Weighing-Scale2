  Controller.prototype._getCurrentPage = function () {
    return document.location.hash.split('/')[1];
  };

  Controller.prototype._parseForURLs = function (text) {
    var re = /(https?:\/\/[^\s"<>,]+)/g;
    return text.replace(re, '<a href="$1" data-src="$1">$1</a>');
  };

  // Export to window
  window.app.Controller = Controller;
})(window);